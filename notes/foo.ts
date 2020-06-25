import { doThing } from "./bar.ts";
import type {Options} from './bar.ts'

function doThingBetter(options: Options) {
    // do something twice as good
    doThing(options);
    doThing(options);
}

doThingBetter({name: 'hello'})