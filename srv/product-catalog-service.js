const cds = require('@sap/cds')
module.exports = async function (){

  const db = await cds.connect.to('db') // connect to database service
  const { Products } = db.entities         // get reflected definitions

  // Reduce stock of ordered product if available stock suffices
  this.on ('submitOrder', async req => {
    const {product,amount} = req.data
    const n = await UPDATE (Products, product)
      .with ({ stock: {'-=': amount }})
      .where ({ stock: {'>=': amount }})
    n > 0 || req.error (409,`${amount} exceeds stock for product #${product}`)
  })

  // Add some discount for overstocked product
  this.after ('READ','Products', each => {
    if (each.stock > 100)  each.name += ` -- 10% discount!`
  })
}