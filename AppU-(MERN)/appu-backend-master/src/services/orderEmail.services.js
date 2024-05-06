const nodemailer = require('nodemailer');
const cron = require('node-cron');
const { Orders } = require('../models');


const emailscheduler = async () => {
    const lessthenDate = new Date();
    lessthenDate.setHours(23, 55, 00 );

    const greaterthenDate = new Date();
    greaterthenDate.setHours(00, 05, 00 );

    const findResult = await Orders.find(
        {
        createdAt: {
            $gte: greaterthenDate,
            $lt: lessthenDate,
          },}
        , 
        function (err, users) {
            if (err) console.log(err);
            else {
                // console.log(users);
            }
        });

//Calculate total Price
    let total = findResult.reduce((total, items) => {
        const { totalPrice } = items;
        total.priceTotal += totalPrice
        return total
    }, { priceTotal: 0, })

//Total Orders
    let totalOrder=findResult.reduce((order, items)=>{
        const {orderItems}= items
        order.totalOrders +=orderItems.length
        return order
    },{totalOrders:0,})
    
    const output = `
    <h4>You have an new order today</h4>
    <h3>Order Detail</h3>
    <h4>Total Orders : ${totalOrder.totalOrders} </h4>
    <h4> Total Amount : ${total.priceTotal} Rupees</h4>
    ${Object.entries( findResult.reduce((a,{urlKey, orderItems})=>{
        a[urlKey] = (a[urlKey]??0)+orderItems.length
        return a ;
    },{})).map(([urlKey, orderItems]) => {
            return (`<h4>${urlKey} :  ${orderItems}</h4> `)
        
    }).join('')}
    `;
    
    let date_ob = new Date();
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    let Todaydate = date+"-"+ month+"-" + year;

    maillist =[
        'hassan.salahuddin@gmail.com', 
        'matiullah85@gmail.com',
    ];
    const mailDetails = {
        from:'info.appupk@gmail.com' , 
        to: maillist,
        subject: `Appu Orders Today < ${Todaydate} >`,
        html: output
    };

    const configurations = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'info.appupk@gmail.com', //Enter User Name
            pass: 'zqjlycclmfieigks' //Enter password
        }
    });
};

const scheduleOrderEmails = () => {
    cron.schedule('25 19 * * * ', emailscheduler);
}

module.exports = { scheduleOrderEmails }