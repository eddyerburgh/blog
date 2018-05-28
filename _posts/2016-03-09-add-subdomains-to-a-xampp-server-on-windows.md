---
layout: post
status: publish
published: true
title: Add subdomains to a XAMPP server on Windows
description: Learn how to add subdomains to a XAMMP server. Follow these simple steps to  quickly add a new subdomain to your local XAMPP server!
author:
  display_name: Edd Yerburgh
  login: admin
  email: edward.yerburgh@gmail.com
  url: ''
author_login: admin
author_email: edward.yerburgh@gmail.com
wordpress_id: 128
wordpress_url: http://www.eddyerburgh.com/?p=128
date: '2016-03-09 11:27:38 +0000'
date_gmt: '2016-03-09 11:27:38 +0000'
categories:
- Tutorials
- XAMPP
tags: []
comments: true
---

Local subdomains are useful for organizing local projects.  Luckily, it's easy to add Subdomains to a XAMPP Server! Simply copy some code, paste it in the correct files and off you go!

**Warning**: Although it's easy to add new subdomains,** the files we'll be editing are critical for XAMPP to run, make copies of files before making changes!**

1. Choose a string for your subdomain. For this example we'll use'test', which will produce the domain *test.localhost.com*.
2. Create a new directory in *C:\xampp\htdocs *with the same name as your chosen string. This will be the root of your new subdomain.
3. Create an index.html in your new directory.
4. Find your root XAMPP directory. This will probably be *C:\xampp* .
5. From your xampp root, go to apache >> conf >> extra.  **C:\xampp\apache\conf\extra**
6. Make a copy of *httpd-vhosts.conf*, as shown below:
<figure><a rel="noopener" href="/assets/2016/03/xampp.apache.png" rel="attachment wp-att-129"><img class="wp-image-129 size-full" src="/assets/2016/03/xampp.apache.png" alt="apache > conf > extra directory" width="925" height="421" /></a> <figcaption>Your extra directory should look something like this</figcaption></figure>
7. Now open the original file *httpd-vhosts.conf* in a text editor
8. Copy the code below, and paste it at the **very bottom** of *http-vhosts.conf*

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

9. Replace* test* with your chosen string. This will be the name of your subdirectory.
10. Go to *C:\Windows\System32\drivers\etc*, as shown below
<figure><a rel="noopener" href="/assets/2016/03/xampp.system32.png" rel="attachment wp-att-130"><img class="wp-image-130 size-full" src="/assets/2016/03/xampp.system32.png" alt="C:\ > Windows > System32 > drivers > etc" width="698" height="147" /></a> <figcaption>Your etc directory should look like this after copying hosts</figcaption></figure>
 
11. Create a copy of hosts
12. At the bottom of the file, below *127.0.0.1 localhost.com*, add the below code
```
127.0.0.1 test.localhost.com
```

13. Replace *test* with your chosen string

Congratulations, You've created a new subdomain! Restart your server from the XAMPP control panel and visit your new subdomain in your browser to check everything's gone to plan.

Use this technique to add subdomains to a XAMPP Server anytime you want. I've got about ten at the moment!

Any problems, leave a comment and I'll try to help.

*If your xampp stops working after editing httpd-vhosts.conf, delete the file you changed and remove - Copy from your copy. This should fix the problem.
