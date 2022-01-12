
const nodemailer = require("nodemailer");
var hbs = require('nodemailer-express-handlebars');

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
      from: '"1Beauty.com 👻" <ndthang0000@gmail.com>', // sender address
      to: data.email, // list of receivers
      subject: "Thông tin đặt hàng", // Subject line
      html: `<h3>Đặt hàng thành công</h3>
              <p>Cảm ơn <b>${data.name}</b> vì đã tin tưởng và đặt hàng tại website của chúng tôi <3 </p>
              <p>Thông tin đặt hàng</p>
              <p>Vào lúc <b>${data.createdAt}</b>, bạn đã đặt <b>${data.quantity}</b> sản phẩm ở website 1Beauty của chúng tôi
              bao gồm :
              </p>
              <ul>
                ${data.product.forEach(item=>{
                  return '<li>'+item.infor.quantity+ ' sản phẩm '+item.productId.name+' '+'size :'+item.infor.size;
                }).join(' ')}
              </ul>
              <p>Tổng giá trị đơn hàng là :${data.sum}</p>
              <p>Địa chỉ giao hàng là : ${data.address}</p>
              <p>Số điện thoại: ${data.tel}</p>
              <p>Hãy theo dõi email để nhận các thông tin mới nhất về đơn hàng bạn nhé !</p>
              <p>From : 1Beauty</p>
              <p> <b>Xin chân thành cảm ơn<b></p>

      `, 
  });
}

module.exports=sendMail