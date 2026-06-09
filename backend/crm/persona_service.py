def classify_persona(customer):
    genres = list(
        customer.orders.values_list(
            "genre",
            flat=True
        )
    )

    if not genres:
        return (
            "New Reader",
            "Has not made enough purchases."
        )

    fantasy_count = genres.count("Fantasy")

    fantasy_ratio = fantasy_count / len(genres)

    if fantasy_ratio > 0.6:
        return (
            "Fantasy Explorer",
            "Frequently purchases fantasy books."
        )

    return (
        "General Reader",
        "Reads across multiple genres."
    )