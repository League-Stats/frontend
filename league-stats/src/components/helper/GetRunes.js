export function getRunes(runes){
    const slots = runes.map(runePath => {return runePath.slots})
    const flattenSlots = [].concat.apply([], slots)
    const subSlots = flattenSlots.map(subSlot => {return subSlot.runes})
    const runesInfo = [].concat.apply([], subSlots)

    return runesInfo
}