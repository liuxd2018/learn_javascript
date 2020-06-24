
import {hello2} from  './cmod2.mjs'
import hello3 from './cmod2.mjs'

import * as helloM from './cmod2.mjs'

import {hello} from './cmod.mjs'

hello()
hello2()
hello3()

helloM.hello1()
helloM.hello2()
// helloM.hello3()