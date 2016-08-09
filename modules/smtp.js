var Mail = require("lazysmtp").Mail;
var mail = new Mail("example.com", false);
mail.start();
 
mail.on("mail", function(email) {

    console.log(email);
 
});

// use mailparser package

/* Received: by mail-wm0-f44.google.com with SMTP id f65so54395078wmi.0
        for <test@fuk.nu>; Tue, 09 Aug 2016 13:57:05 -0700 (PDT)
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;
        d=gmail.com; s=20120113;
        h=mime-version:from:date:message-id:subject:to;
        bh=2cOQU44UgTig/exOCkqAgXLXPqkzh8QWi4XiOpiD9Ag=;
        b=BONQKwa+RLnzfEFEiXUlONwEM92be3sBW5dYqx7JSddiYzrv1qVTiOCXpDzO3/eCZ7
         jpT/fysSGpgxKey3hO/zDEaElMnKG/t1Mo7Jjn9+kS1iaiOCsBLnaUsvBwFjGOW3uc32
         qAEHrOmfb6XKMZV/OobnqRkdAdFO0E5eqp2RZWa1e7GpdQcdF65Mo7l5pt1mgORw9rAb
         HNYHSQt4bg/fQXyojjiMh3+HJ9/cyplvR6DVEYOGeEpU+Z5ENz2HHsJ36GACgjVpBm5g
         SWI9ZkTjSjNybgsYq4gmGdQ9oGXxb29841DfDQdZTP3PZYw9GThl3tWwB+wM0FP97XAq
         XR3A==
X-Google-DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;
        d=1e100.net; s=20130820;
        h=x-gm-message-state:mime-version:from:date:message-id:subject:to;
        bh=2cOQU44UgTig/exOCkqAgXLXPqkzh8QWi4XiOpiD9Ag=;
        b=bCu2+lErXzn/gh+7jkpwcCI+0xl7Y/bO0QrhgJF8nQqpF8NC58Lt77568s7iI1ghAj
         EYOWIRaVsFLA0S2tlSfUjhuC684ukYFWnSoo6b6XOjEBPe2QNr8zLvuxGlVuSB3UkNy2
         X7qlp2XufzUfiG7ZLheLGy/2vmMVe7CayAwHSJaxjcESDKRVFHKlUZ/28xRuTgs2WI3L
         anvTrHvGUZRB1pK/vXcRu54AjqIHUolgGVOqVqp3ZMbBAxYgFlIgj1STLIrSMJhdI1QQ
         yrPA+aVuSabVHWSMN0saJWOOY7j/+3R+ghRazM49OO91/UaLfYG9YdtjwXEpqqvkq96Q
         dBRg==
X-Gm-Message-State: AEkooutii8KLYUcLSSCwSBQ3hoLiK97f01cUFOBZQnh2Jk1LFXnCKo1hISxqUMWcYd0ucfsYJl032qfbOCM+Qg==
X-Received: by 10.25.147.197 with SMTP id v188mr56461lfd.9.1470776224083; Tue,
 09 Aug 2016 13:57:04 -0700 (PDT)
MIME-Version: 1.0
Received: by 10.114.20.132 with HTTP; Tue, 9 Aug 2016 13:56:43 -0700 (PDT)
From: Thom <snkenjoi@gmail.com>
Date: Tue, 9 Aug 2016 21:56:43 +0100
Message-ID: <CAFUKCRzfPZwKG=y77rPrJQgs+wvq+7dWo0+ixoR6gsx6Gq+9Vg@mail.gmail.com>
Subject: [subject]
To: test@fuk.nu
Content-Type: multipart/alternative; boundary=001a114024466177c10539a9c62a

--001a114024466177c10539a9c62a
Content-Type: text/plain; charset=UTF-8

[message]

*bold*

--001a114024466177c10539a9c62a
Content-Type: text/html; charset=UTF-8

<div dir="ltr"><div>[message]<br><br></div><b>bold</b><br></div>

--001a114024466177c10539a9c62a--
.


*/