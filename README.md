##描述

用于输入Email地址的文本框的自动提示功能。

##使用介绍

**样式文件：**
	
	.email_auto { background: none repeat scroll 0 0 #FFFFFF; border: 1px solid #999999; color: #666666; display: none; font: 12px/1.5 Tahoma,Helvetica,arial,sans-serif; left: 120px; overflow: hidden; position: absolute; top: 27px; width: 278px; z-index: 1; }
	.email_auto p { color: #666666; padding: 3px 5px; }
	.email_auto ul { cursor: pointer; }
	.email_auto li { display: block; height: 20px; line-height: 20px; padding: 0 5px; }
	.email_auto li.current { background-color: #DDDDDD; color: #000000; }

**加入 autoEmail代码：**

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
    <script src="jquery-autoemail.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            $("#email-input").autoEmail();

            $("#email-input2").autoEmail({ emailDomain: ["@outlook.com", "@gmail.com", "@qq.com"] });//自定义填充email列表
        })
    </script>

**截图：**

![jquery-autoemail][1]


  [1]: http://i.stack.imgur.com/mEOrD.png
