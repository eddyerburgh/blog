---
layout: post
status: publish
published: true
title: Run a Node script with Windows task scheduler
description: Run a node script with Windows task scheduler. Using git Bash and Windows task scheduler we'll see how to automatically run a node script on Windows.
wordpress_id: 358
wordpress_url: http://www.coding123.org/?p=358
date: '2016-10-30 21:07:02 +0000'
date_gmt: '2016-10-30 21:07:02 +0000'
categories:
- JavaScript
- Tutorials
tags: []
comments: true
---

In this tutorial, we are going to learn how to run a node script with windows task scheduler.

To run a node script with windows task scheduler we need:

* A machine running windows
* A script file to run
* Node installed
* Git bash installed

## Setting up

### The script

This can be any scripts that can run in node. We could have a script that takes a backup of a database and uploads it to dropbox, or a script that moves old log files to a Logs folder.

In this tutorial we'll use an example script - script.js. script.js prints 'Bedtime!' to the console:

```js
console.log('Bedtime!')
```

scripts.js is saved in C:\Users\Edd\Scripts (more on that later).

### Node

If it's not installed already, <a rel="noopener" href="https://nodejs.org/en/download/" target="_blank">download it and install</a>.

To check node installed successfully enter node -v into git bash, or another shell. If the command is not found, node did not install successfully.

### Git bash

We're going to use git bash shell to run the command that runs our script. (Because who wants to work with CMD.EXE?)

If you don't have git bash installed already, you can <a rel="noopener" href="https://git-scm.com/downloads">download it here</a>.

Got it installed? Great. Now we need to open up Windows Task Scheduler.

### Windows task scheduler

Windows task scheduler lets you run tasks automatically. You can set commands to run in response to events, like starting up windows or logging in as an admin. You can also schedule them to run at regular intervals.

To set up a task to run in Task Scheduler, we first need to <a rel="noopener" href="https://technet.microsoft.com/en-us/library/cc721931(v=ws.11).aspx" target="_blank">open start task scheduler</a>. For Windows 8+ search task scheduler in the start menu search bar and open it from the results.

When Task Scheduler's open we're ready to add our task.

## Adding the task

Now we have git bash installed and task scheduler open. Let's add the task!

## Creating a task

We need to create a task that will run our script.

In Task Scheduler, find the **Task Scheduler Library** folder tree. This should contain some folders like *Microsoft*, or *WPD* - these are known as** Task Folders**. Task Folders are used to store tasks (duh!).

For this example, we'll add a new folder - Scripts. Adding a new Task Folder is easy:


1. in the actions panel, click *New Folder* and enter the folder name (Scripts). (If that was too vague, <a rel="noopener" href="https://technet.microsoft.com/en-us/library/cc749582(v=ws.11).aspx">Click here</a> for more detailed instructions on adding a Task Folder).
2. After you've added the new folder, click on it in the folder tree.
<a rel="noopener" href="/assets/2016/10/task-scheduler-tree.png"><img class="wp-image-367 size-full" src="/assets/2016/10/task-scheduler-tree.png" alt="Task scheduler tree" width="997" height="405" /></a>
3. In the actions panel, click *Create Task*. This will open the create task wizard.
4. Give your task a a name and a description - to describe what your task is doing.<a rel="noopener" href="/assets/2016/10/creating-new-task.png"><img class="aligncenter size-full wp-image-365" src="/assets/2016/10/creating-new-task.png" alt="creating-new-task" width="642" height="486" /></a>
5. In Security options, make sure** Run whether user is logged on or not **is selected.
6. Select **Run with highest privileges**. This will avoid any permissions issues node might have running file system operations.
7. Open the **Triggers** tab
8. Click  **New...**  to add a new trigger. A trigger is an action or event that begins your task. In this example, we're going to have it trigger on a schedule. So it will run daily at a specified time.
9. In the **Begin the task** dropdown, select **On a schedule**
10. In the Settings panel, select Daily
11. In the start data panel, select the date for the trigger to begin and the time that it should run. (22:00 in our case)
<a rel="noopener" href="/assets/2016/10/adding-new-trigger.png"><img class="wp-image-366 size-full" src="/assets/2016/10/adding-new-trigger.png" alt="adding-new-trigger" width="603" height="520" /></a>
12. Click OK
13. Switch to the **Actions** tab
14. Click **New...**
15. Now, we add the action. This is the meat of the tutorial and it's a bit more complicated. So we're going to go into this in more detail below.

### The action

*The action* is the thing that is run when the *trigger* occurs.

Our action is going to be - start git bash, navigate to the Scripts folder, run script.js in node.

We can start git bash using the Start a program action. The rest will be done using arguments.

1. In the **Action** drop down select **Start a program**
2. Click **Browse...**
3. Find git-bash.exe in file explorer, select it and click **Open**. It should be located in *C:\Program Files* or *Program Files (x86)*

Now git bash will start when our trigger is *ehum* triggered. The next thing is to add the arguments.

### The arguments

This is the meat of the tutorial. The arguments are entered when git bash is opened. They change directory to our Scripts folder, execute our script in node and close git bash when the process is complete.

Copy and paste the code below into the **Add arguments** input field.

```shell
--a -i -c "cd Scripts; node script.js"
```

This might look cryptic to you, but it's just a list of commands for the computer to carry out.

`-i` sets the shell to run in <a rel="noopener" href="https://www.gnu.org/software/bash/manual/html_node/Interactive-Shells.html#Interactive-Shells">interactive shell mode</a>.

`-c` sets it to execute the first non option argument passed to it, then exit. So in our example it'll execute the node command.

`-l` is short for login.

`cd` changes directory into the Scripts folder (cd - change directory). This is located in the user folder (C:\Users\Edd in my case). Git bash opens in the ~ directory, which is normally the directory of the logged in user.

node script.js runs script.js in node.

Simple really.

### Finishing off

Now our **New Action **dialog should look similar to the image below.

<a rel="noopener" href="/assets/2016/10/adding-action.png"><img class="aligncenter wp-image-370 size-full" src="/assets/2016/10/adding-action.png" alt="Add an action to run a Node Script with Windows Task Scheduler" width="465" height="505" /></a>

If it does, we're ready to go!

Click Ok to save the new action, and Ok to save the new Task.

Woop! The new task is saved and will run at 10PM everyday!

