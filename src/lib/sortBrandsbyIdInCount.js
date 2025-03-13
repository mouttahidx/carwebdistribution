export function sortBrandsByReference(brands, referenceOrder) {
    return brands.slice().sort((a, b) => {
        let indexA = referenceOrder.indexOf(a.id);
        let indexB = referenceOrder.indexOf(b.id);

        // If both IDs are in referenceOrder, maintain their order
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;

        // If one ID is in referenceOrder, prioritize it
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

        // Keep original order for items not in referenceOrder
        return 0;
    });
}