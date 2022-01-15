
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
let sendMailOrder=async(data)=>{
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
                  return `<li> <img src="https://the-1-beauty-fashion-admin.herokuapp.com${item.productId.imagesUrl[0]}" alt="" style="width:30px"> ${item.infor.quantity} sản phẩm <b>${item.productId.name}</b>, size : <b>${item.infor.size}</b>`
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
let sendMailRegister=async(data)=>{
  await transporter.sendMail({
      from: 'ndthang0000@gmail.com', // sender address
      to: data.gmail, // list of receivers
      subject: "Kích hoạt tài khoản", // Subject line
      html: `<h2>Xác thực tài khoản</h2>
              <p>- Vào lúc <b>${moment(data.createdAt).format('LL')}</b>, bạn đã đăng ký tài khoản tại website của chúng tôi <3 </p>
              <p>Để xác thực đây là bạn, vui lòng nhấn vào đường link bên dưới</p>
              <p> <a href="${data.link}">Đây là tôi</a> </p>
              <p><b>Lưu ý:</b> Đường dẫn trên chỉ tồn tài 24h</p>
              <h3>From : 1Beauty</h3>
              <p> <b>Xin chân thành cảm ơn<b></p>
      `
  })
}
let sendMailResetPassword=async(data)=>{
  await transporter.sendMail({
      from: 'ndthang0000@gmail.com', // sender address
      to: data.gmail, // list of receivers
      subject: "Đặt lại mật khẩu", // Subject line
      html: `<h2>Đặt lại mật khẩu</h2>
              <p>- Vào lúc <b>${moment(data.createdAt).format('LL')}</b>, bạn đã sử dụng chức năng quên mật khẩu của chúng tôi <3 </p>
              <p>Để đặt lại mật khẩu, vui lòng nhấn vào đường link bên dưới</p>
              <p> <a href="${data.link}">Lấy lại mật khẩu</a> </p>
              <p><b>Lưu ý:</b> Đường dẫn trên chỉ tồn tài 24h</p>
              <h3>From : 1Beauty</h3>
              <p> <b>Xin chân thành cảm ơn<b></p>
      `
  })

}

module.exports={
  sendMailOrder,
  sendMailRegister,
  sendMailResetPassword
}