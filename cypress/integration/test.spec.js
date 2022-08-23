const { func } = require("assert-plus");

let id


const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

var randomFixedInteger = function (length) {
  return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}


const url = 'https://test.api.hyssa.udevs.io'
// const mail = generateString(4) + '@mail.ru'
const static_otp = '667875'
const env = Cypress.env
const user_id = '0017Q00000W8PYYQA3'
const bank_acc = "a1P7Q00000058RbUAI"

describe('Hyssa API test', function(){
          // it('Investor CR', function() {

          // //                     //Создание почты
          // //           cy.request({
          // //             method: 'POST',
          // //             url: url + '/investor/login',

          // //             body: {
          // //               "email": mail
          // //             },
          // //           })
          // //           .then (function(response) {
          // //               Cypress.env('first_id', response.body.data.id) 
          // //           expect(response.status).to.eq(200)
          // //           expect(response.body).to.have.property('description', "The request has succeeded")
          // //           expect(response.body).to.have.property('status', 'OK')
          // //           })
          // //           cy.log(Cypress.env('first_id'))

          // //                     //Подтверждение почты
          // //           cy.request({
          // //             method: 'POST',
          // //             url: url + '/investor/confirm-email',

          // //             body: {email: mail, 
          // //                   id: Cypress.env('first_id'), 
          // //                   otp: static_otp},
          // //           })
          // //           .then (function (response) {
          // //           env('id', response.body.data.user_id)
          // //           cy.log(Cypress.env('id'))
          // //           expect(response.status).to.eq(200)
          // //           expect(response.body).to.have.property('description', "The request has succeeded")
          // // })

          //           //           //Проверка KYC status
          //           // cy.request({
          //           //           method: 'GET',
          //           //           url: url + '/sumsub/token',

          //           //           body: {
          //           //                     "investor-id": user_id
          //           //           }
          //           // })
          //           //           .then(function(response) {
          //           //                     expect(response.body).to.have.property('description', "The request has succeeded")
          //           //           })
                    
          //           cy.request({
          //             method: "GET",
          //             url: url + '/investor/' + user_id
          //           })
          //           .then(function(response) {
          //             expect(response.body).to.have.property('description', "The request has succeeded")
          //             expect(response.body.data.personal_info).to.have.property('first_name', "Cypress")
          //           })
          // })

          // it('TopUp&Withdraw', function() {

          //       //Get pockets info
          //   cy.request({
          //     method: 'GET',
          //     url: url + '/pocket/?user_id=' + user_id
          //   })
          //   .then(function(response) {
          //     Cypress.env('cash_pocket_id', response.body.data.pockets[0].name)
          //     cy.log(Cypress.env('cash_pocket_id'))
          //     // expect(response.body.data.pockets[0].user_id).to.have.property(user_id)
          //     Cypress.env('presum', Math.round(response.body.data.pockets[0].balance.balance))
          //     cy.log(Cypress.env('presum'))
          //   })

          //       //Get Top up Tax
          //       cy.request({
          //         method: 'POST',
          //         url: url + '/pocket/operation/tax',
          //         body: {
          //             "amount": "100",
          //             "operation_name": "Top Up",
          //             "user_id": user_id
          //         }
          //       })
          //       .then(function(response) {
          //         Cypress.env('t_tax', Math.round(response.body.data.tax_calculated))
          //         cy.log(Cypress.env('t_tax'))
          //       })

          //       //TopUp      
          //   cy.request({
          //     method: 'POST',
          //     url: url + '/pocket/operation/top_up',
          //     body: {
          //       "amount": "100",
          //       "bank_account": bank_acc,
          //       "currency": "USD",
          //       "pocket_id": Cypress.env("cash_pocket_id"),
          //       "user_id": user_id
          //     }
          //   })
          //   .then(function(response) {
          //     expect(response.body).to.have.property('description', "The request has succeeded")
          //   })

          //   cy.request({
          //     method: 'GET',
          //     url: url + '/pocket/?user_id=' + user_id
          //   })
          //   .then(function(response) {
          //     expect(Math.round(response.body.data.pockets[0].balance.balance)).to.have.equal(Cypress.env('presum') + Cypress.env('t_tax'))
          //     Cypress.env('presum', Math.round(response.body.data.pockets[0].balance.balance))
          //     cy.log(Cypress.env('presum'))
          //   })

          //       //Get Withdraw Tax
          // cy.request({
          //   method: 'POST',
          //   url: url + '/pocket/operation/tax',
          //   body: {
          //       "amount": "100",
          //       "operation_name": "Wihdraw",
          //       "user_id": user_id
          //   }
          // })
          // .then(function(response) {
          //   Cypress.env('w_tax', Math.round(response.body.data.tax_calculated))
          //   cy.log(Cypress.env('w_tax'))
          // })

          //       //Withdraw
          //   cy.request({
          //     method: 'POST',
          //     url: url + '/pocket/operation/withdraw',
          //     body: {
          //       "amount": "100",
          //       "bank_account": bank_acc,
          //       "currency": "USD",
          //       "pocket_id": Cypress.env("cash_pocket_id"),
          //       "user_id": user_id
          //     }
          //   })
          //   .then(function(response){
          //     expect(response.status).to.eq(200)
          //   })

          //   cy.request({
          //     method: 'GET',  
          //     url: url + '/pocket/?user_id=' + user_id
          //   })
          //   .then(function(response) {
          //     expect(Math.round(response.body.data.pockets[0].balance.balance)).to.have.equal(Cypress.env('presum') - Cypress.env('w_tax'))
          //   })
          // })

          it('Buy&Sell', function() {
                //Get pockets info
            cy.request({
              method: 'GET',
              url: url + '/pocket/?user_id=' + user_id
            })
            .then(function(response) {
              Cypress.env('invest_pocket_id', response.body.data.pockets[1].name)
              cy.log(Cypress.env('invest_pocket_id'))
            })
                
            var investor_pocket_id = Cypress.env('invest_pocket_id')

                //Save purchased stocks count
            cy.request({
              method: 'GET',
              url: url + '/investor/purchased-stock/?investor_id=' + user_id
            })
            .then(function(response) {
              Cypress.env('purchased_stocks', response.body.data.stocks[0].count)
              cy.log(Cypress.env('purchased_stocks'))
            })

                //Buy
            cy.request({
              method: 'POST',
              url: url + '/pocket/operation/buy',
              body: {
                "cash_pocket_id": Cypress.env('cash_pocket_id'),
                "currency": "USD",
                "quantity": 1,
                "stock_pocket_id": Cypress.env('invest_pocket_id'),
                "symbol_id": "ABCL.NASDAQ",
                "user_id": user_id
              }
            })
            .then(function(response) {
                Cypress.env('order_id', response.body.data.id)
                cy.log(Cypress.env('order_id'))
              })

                //Check order
              cy.request({
                method: 'GET',
                url: url + '/investor/orders?investor-id=' + user_id + '&page=1&limit=20'
              })
              .then(function(response) {
                let index
                let order = response.body.data.orders
                for (let i = 0; i < order.length; i++) {
                    if (order[i].id === Cypress.env('order_id')) {
                      index = i
                    }
                }
                expect(response.body.data.orders[index].id).to.eq(Cypress.env('order_id'))
                const status = 'response.body.data.orders[index].status'
                if ((status == ("filled"))) {
                  cy.request({
                    method: 'GET',
                    url: url + '/investor/purchased-stock/?investor_id=' + user_id
                  })
                  .then(function(response) {
                    expect(response.body.data.stocks[0].count).to.have.equal(Cypress.env('purchased_stocks') + 2) ///
                  })
                }
                else if ((status == ("filled"))) {
                  cy.request({
                    method: 'GET',
                    url: url + '/investor/purchased-stock/?investor_id=' + user_id
                  })
                  .then(function(response) {
                    expect(response.body.data.stocks[0].count).to.have.equal(Cypress.env('purchased_stocks') + 2) ///
                  })
                }
              })

              //Sell
            cy.request({
              method: 'POST',
              url: url + '/pocket/operation/sell',
              body: {
                "cash_pocket_id": Cypress.env('cash_pocket_id'),
                "currency": "USD",
                "quantity": 1,
                "stock_pocket_id": Cypress.env('invest_pocket_id'),
                "symbol_id": "ABCL.NASDAQ",
                "user_id": user_id
              }
            })
            .then(function(response) {
                Cypress.env('order_id', response.body.data.id)
                cy.log(Cypress.env('order_id'))
              })

                //Check order
              cy.request({
                method: 'GET',
                url: url + '/investor/orders?investor-id=' + user_id + '&page=1&limit=20'
              })
              .then(function(response) {
                let index
                let order = response.body.data.orders
                for (let i = 0; i < order.length; i++) {
                    if (order[i].id === Cypress.env('order_id')) {
                      index = i
                    }
                }
                expect(response.body.data.orders[index].id).to.eq(Cypress.env('order_id'))
              })
          })
})
