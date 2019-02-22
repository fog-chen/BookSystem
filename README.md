# BookSystem
图书租赁查看系统
+ 这是系统登录页面，使用cookie做了判断，如果没有登录过则无法进入里面的页面，必须跳转到登录页面来登陆。做了规则验证，用户名和密码都必须输入，也做了判断，
判断此用户是否存在以及密码是否正确
![image](https://github.com/fog-chen/BookSystem/blob/master/BookSystem/src/assets/read/login.PNG)
+ 这是图书首页，目前可以添加图书和删除图书，数据是使用mock模拟的，建立了本地储存。图片做了判断，如果没有上传图片的话就显示默认图片。
![image](https://github.com/fog-chen/BookSystem/blob/master/BookSystem/src/assets/read/index.PNG)
+ 这是图书信息，数据也是mock模拟的，删除功能完成。时间是使用了时间戳再转换的。
![image](https://github.com/fog-chen/BookSystem/blob/master/BookSystem/src/assets/read/bookInfo.PNG)
+ 这是借阅信息，操作有三种状态，查看、删除和还书，当还没有还书时，就不能删除，只能进行查看和还书两个操作，一旦还书，就可以进行删除
操作，还书是将现在的时间赋给还书时间。
![image](https://github.com/fog-chen/BookSystem/blob/master/BookSystem/src/assets/read/borrowinfo.PNG)
+ 这是用户信息页面，有一个增添用户的功能,添加用户完成，表单也是用了验证，是封装好的公用验证。
![image](https://github.com/fog-chen/BookSystem/blob/master/BookSystem/src/assets/read/userInformation.PNG)
