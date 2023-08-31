import { ComputedOptions, MethodOptions, render } from 'vue';
import { RawChildren, RawProps, RawSlots } from '~/utils/util';

/**
 * 渲染组件到 `document.body`。
 * @param comp 组件
 * @param props 传入的 props
 * @param children 子组件、插槽
 * @returns 组件实例
 */
export function renderComponent<P extends RawProps, R, D, C extends ComputedOptions, M extends MethodOptions>(
  comp: Component<P, R, D, C, M>,
  props?: (Component<P, R, D, C, M> extends Component<infer P> ? P : never)['$props'] | null,
  children?: RawChildren | RawSlots,
) {
  const el = h<P>(comp, props, children);
  render(el, document.body);
  return el;
}
