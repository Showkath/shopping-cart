const cds = require('@sap/cds')

module.exports = cds.service.impl(function() {

  const { Products } = cds.entities

  // Reduce stock of ordered Products if available stock meet requirements
  this.before ('CREATE', 'Orders', (req) => {
    const { items: items } = req.data
    return cds.transaction(req) .run (items.map (item =>
      UPDATE (Products) .where ('ID =', item.product_ID)
      .and ('stock >=', item.amount)
      .set ('stock -=', item.amount)
    )) .then (all => all.forEach ((affectedRows,i) => {
      if (affectedRows === 0)  req.error (409,
        `${items[i].amount} exceeds stock for product #${items[i].product_ID}`
      )
    }))
  })

})