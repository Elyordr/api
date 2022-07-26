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
const user_id = '0017Q00000S8T8fQAF'
const super = 'superman'

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

          it('TopUp&Withdraw', function() {

                //Get pockets info
            cy.request({
              method: 'GET',
              url: url + '/pocket/?user_id=' + user_id
            })
            .then(function(response) {
              Cypress.env('cash_pocket_id', response.body.data.pockets[0].name)
              cy.log(Cypress.env('cash_pocket_id'))
              // expect(response.body.data.pockets[0].user_id).to.have.property(user_id)
              Cypress.env('presum', Math.round(response.body.data.pockets[0].balance.balance))
              cy.log(Cypress.env('presum'))
            })

                //Get Top up Tax
                cy.request({
                  method: 'POST',
                  url: url + '/pocket/operation/tax',
                  body: {
                      "amount": "100",
                      "operation_name": "Top Up",
                      "user_id": user_id
                  }
                })
                .then(function(response) {
                  Cypress.env('t_tax', Math.round(response.body.data.tax_calculated))
                  cy.log(Cypress.env('t_tax'))
                })

                //TopUp      
            cy.request({
              method: 'POST',
              url: url + '/pocket/operation/top_up',
              body: {
                "amount": "100",
                "currency": "USD",
                "pocket_id": Cypress.env("cash_pocket_id"),
                "user_id": user_id
              }
            })
            .then(function(response) {
              expect(response.body).to.have.property('description', "The request has succeeded")

            })

            cy.request({
              method: 'GET',
              url: url + '/pocket/?user_id=' + user_id
            })
            .then(function(response) {
              expect(Math.round(response.body.data.pockets[0].balance.balance)).to.have.equal(Cypress.env('presum') + Cypress.env('t_tax'))
              Cypress.env('presum', Math.round(response.body.data.pockets[0].balance.balance))
              cy.log(Cypress.env('presum'))
            })

                //Get Withdraw Tax
          cy.request({
            method: 'POST',
            url: url + '/pocket/operation/tax',
            body: {
                "amount": "100",
                "operation_name": "Wihdraw",
                "user_id": user_id
            }
          })
          .then(function(response) {
            Cypress.env('w_tax', Math.round(response.body.data.tax_calculated))
            cy.log(Cypress.env('w_tax'))
          })

                //Withdraw
            cy.request({
              method: 'POST',
              url: url + '/pocket/operation/withdraw',
              body: {
                "amount": "100",
                "currency": "USD",
                "pocket_id": Cypress.env("cash_pocket_id"),
                "user_id": user_id
              }
            })
            .then(function(response){
              expect(response.status).to.eq(200)
            })

            cy.request({
              method: 'GET',  
              url: url + '/pocket/?user_id=' + user_id
            })
            .then(function(response) {
              expect(Math.round(response.body.data.pockets[0].balance.balance)).to.have.equal(Cypress.env('presum') - Cypress.env('w_tax'))
            })
          })

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

                //Get stock price
            cy.request({
              method: 'GET',
              url: url + '/integration/fix/get-last-quote/XPEV.NYSE'
            })
            .then(function(response) {
              Cypress.env('stock_price', response.body.data.ticks[0].ask[0].value)
              cy.log(Cypress.env('stock_price'))
            })

            var price = Cypress.env('stock_price')

                //Get Buy Tax
            cy.request({
              method: 'POST',
              url: url + '/pocket/operation/tax',
              body: {
                  "amount": price,
                  "operation_name": "Buy",
                  "symbol_id": "XPEV.NYSE",
                  "user_id": user_id
              }
            })
            .then(function(response) {
              Cypress.env('b_tax', Math.round(response.body.data.tax_calculated))
              cy.log(Cypress.env('b_tax'))
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
                "symbol_id": "XPEV.NYSE",
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
                url: url + '/investor/orders?investor-id=' + user_id
              })
              .then(function(response) {
                expect(response.body.data.orders).to.have.value(Cypress.env('order_id'))
              })
          })
})
