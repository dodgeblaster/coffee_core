module.exports.test = async ({ invoke, assert }) => {
    const res = await invoke(process.env.FUNCTION, {
        detail: {
            synth: true,
            id: '100',
            amount: 400,
            storeId: '200',
            products: 'mock_products'
        }
    })

    const result = JSON.parse(res.Payload)
    assert.equal(result.id, '100')
    assert.equal(result.storeId, '200')
    assert.equal(result.products, 'mock_products')
}
