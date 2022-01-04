const getEventTime = (list, event) =>
    Number(list.find((x) => x.sk.includes(event)).time)

module.exports.handler = async (e) => {
    const Items = e.DBResult.Items
    /**
     * Calculate wait time
     */
    const start = getEventTime(Items, 'started')
    const end = getEventTime(Items, 'completed')
    const waitTime = (end - start) / (1000 * 60)

    return waitTime
}
