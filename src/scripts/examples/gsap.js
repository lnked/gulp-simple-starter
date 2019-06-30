//typical import
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";

//or get to the parts that aren't included inside TweenMax:
import Draggable from "gsap/Draggable";
import ScrollToPlugin from "gsap/ScrollToPlugin";

//or, as of 2.0, all tools are exported from the "all" file (excluding bonus plugins):
import {TweenMax, CSSPlugin, ScrollToPlugin, Draggable, Elastic} from "gsap/all";
//if tree shaking dumps plugins, just reference them somewhere in your code like:
const plugins = [CSSPlugin, ScrollToPlugin];
