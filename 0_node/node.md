# node notes

## get programming with nodejs 2019

### foreword

practical ubiquity

the largest code repository ever for any programming language by
more than 6 times

API handling
databases
authentication
and more

an asynchronous event driven javascript runtime

event listeners:
    some functions runs when an event with a matching name is emitted.

event emitters:
    objects that fire event names

the use of events as a way for the server to execute most of an application's tasks,
run parts of tasks and continue to other tasks before the first task completes.
instead of waiting for an operation from start to finish, nodejs register event
listeners, which are called when teh task the was sent off is complete.

Node.js handles only one task at a time and uses more threads only for tasks that can't
be handled by the main thread.

a pool of processes or threads (an operating-system resource dedicated to running
a series of commands, handling every single tasks, and blocking other tasks from completion)

the inner working of a web applicaiton, and how everything fits together

how a web application is architected

build your development skills through repetition and practice

consider working through an exercise three times.

### unit 0

* terminal and bash
    * PATH: index for finding executable files
    * `which node`
* node.js (node and npm/npx)
    * nvm(node version manager)
        * nvm list
        * nvm ls-remote
        * nvm install 11.0.0
        * node -v
* text editor
* git
    * git --version


*core modules*

