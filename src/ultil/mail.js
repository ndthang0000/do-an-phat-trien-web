
const nodemailer = require("nodemailer");
var hbs = require('nodemailer-express-handlebars');
const moment =require('moment')

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'ndthang0000@gmail.com', // generated ethereal user
      pass: 'ducthang123456', // generated ethereal password
    },
});
transporter.use('compile', hbs({
    viewPath:'views',
    extName:'hbs'
}));
let sendMail=async(data)=>{
  await transporter.sendMail({
      from: 'ndthang0000@gmail.com', // sender address
      to: data.email, // list of receivers
      subject: "Thông tin đặt hàng", // Subject line
      html: `<h2>Đặt hàng thành công</h2>
              <p>- Cảm ơn <b>${data.name}</b> vì đã tin tưởng và đặt hàng tại website của chúng tôi <3 </p>
              <h4>Thông tin đặt hàng</h4>
              <p>Vào lúc <b>${moment(data.createdAt).format('LL')}</b>, bạn đã đặt <b>${data.quantity}</b> sản phẩm ở website 1Beauty của chúng tôi
              bao gồm :
              </p>
              <ul>
                ${data.product.map(item=>{
                  return '<li>'+item.infor.quantity+ ' sản phẩm '+item.productId.name+' '+'size :'+item.infor.size;
                }).join(' ')}
              </ul>
              <p>- Tổng giá trị đơn hàng là :$${data.sum}</p>
              <p>- Địa chỉ giao hàng là : ${data.address}</p>
              <p>- Số điện thoại: ${data.tel}</p>
              <p>Hãy theo dõi email để nhận các thông tin mới nhất về đơn hàng bạn nhé !</p>
              <h3>From : 1Beauty</h3>
              <p> <b>Xin chân thành cảm ơn<b></p>

      `, 
  });
}

module.exports=sendMail