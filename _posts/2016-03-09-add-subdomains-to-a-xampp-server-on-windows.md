---
layout: post
status: publish
published: true
title: Add subdomains to a XAMPP server on Windows
description: Learn how to add subdomains to a XAMMP server. Follow these simple steps to  quickly add a new subdomain to your local XAMPP server!
date: '2016-03-09 11:27:38 +0000'
comments: true
---

In this post you'll learn how to add subdomains to a XAMPP Server.

1. Choose a subdomain. For this example I'll use `test`, which will produce the URL `test.localhost.com`
2. Create a new directory in `C:\xampp\htdocs` with the name of your subdomain (e.g. `C:\xampp\htdocs\test`)
3. Create an `index.html` file in the new directory. This is your subdomain index page
4. Find your root XAMPP directory. This will probably be `C:\xampp`
5. From your XAMPP root, go to `apache\conf\extra`  (e.g. `C:\xampp\apache\conf\extra`)
6. Make a copy of `httpd-vhosts.conf`, as shown below:

<figure><a rel="noopener" href="/assets/2016/03/xampp.apache.png" rel="attachment wp-att-129"><img class="wp-image-129 size-full" src="/assets/2016/03/xampp.apache.png" alt="apache > conf > extra directory" width="925" height="421" /></a> <figcaption>Your extra directory should look something like this</figcaption></figure>

7. Open the original file `httpd-vhosts.conf` in a text editor
8. Copy the code below, and paste it at the bottom of `http-vhosts.conf`:

```apache
#main domain

<virtualhost *:80="">
ServerAdmin webmaster@test.localhost.com
DocumentRoot "C:/xampp/htdocs/"
ServerName localhost
ServerAlias www.localhost.com
ErrorLog "logs/localhost.com-error.log"
CustomLog "logs/localhost.com-access.log" common
</virtualhost>

#test sub-domain

<virtualhost *:80="">
ServerAdmin webmaster@test.localhost.com
DocumentRoot "C:/xampp/htdocs/test"
ServerName test.localhost
ServerAlias www.test.localhost.com
ErrorLog "logs/test.localhost.com-error.log"
CustomLog "logs/test.localhost.com-access.log" common
</virtualhost>
```

9. Replace `test` with your subdomain name
10. Go to `C:\Windows\System32\drivers\etc`, as shown below
<figure><a rel="noopener" href="/assets/2016/03/xampp.system32.png" rel="attachment wp-att-130"><img class="wp-image-130 size-full" src="/assets/2016/03/xampp.system32.png" alt="C:\ > Windows > System32 > drivers > etc" width="698" height="147" /></a> <figcaption>Your etc directory should look like this after copying hosts</figcaption></figure>

11. Create a copy of `hosts`
12. At the bottom of the file add the following code:
```
127.0.0.1 test.localhost.com
```

13. Replace `test` with your subdomain name

Congratulations, You've created a new subdomain!

Now, restart your server from the XAMPP control panel and visit your new subdomain in your browser to check it's working.

You can use this technique to add subdomains to a XAMPP Server anytime you want. I've got ten at the moment!

Any problems, leave a comment and I'll try to help.
