
import { defineComponent, h, type VNode} from 'vue'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type CustomVueRenderer = Partial<VueRenderer>
export type RendererMethods = keyof VueRenderer
export interface VueRednererOptions {

}

export class VueRenderer {
    #elId = 0;
    #options: VueRednererOptions;
    constructor(){

    } 
    #h<T extends VNode>(el: T, children: VNode= null, props ={} ): VNode{
        const elProps = {
            key: `marked-vue-${this.ele}`
        }
    }
    hr(){
        return h("hr")
    }
    heading(children: VNode, level:HeadingLevel){
        return h("h1", children)
    }
}
