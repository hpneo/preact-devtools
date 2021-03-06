import { h, Fragment } from "preact";
import { useObserver, useStore } from "../../store/react-bindings";
import { PropsPanel } from "./inspect/PropsPanel";
import { serializeProps } from "./inspect/serializeProps";
import { DebugTreeStats } from "./DebugTreeStats";
import { DebugNodeNavTree } from "./DebugNodeNavTree";
import { KeyPanel } from "./KeyPanel";
import { HocPanel } from "./HocPanel";

export function Sidebar() {
	const store = useStore();
	const showDebug = useObserver(() => store.debugMode.$);
	const inspect = useObserver(() => store.inspectData.$);
	const hocs = useObserver(() => {
		if (store.inspectData.$) {
			const node = store.nodes.$.get(store.inspectData.$.id);
			return node ? node.hocs : null;
		}
		return null;
	});
	const { props: propData, state, context, hooks } = store.sidebar;
	const { emit } = store;

	return (
		<Fragment>
			{inspect && inspect.key !== null && (
				<KeyPanel
					value={inspect.key}
					onCopy={() => emit("copy", inspect.key!)}
				/>
			)}
			{inspect && hocs !== null && hocs.length > 0 && <HocPanel hocs={hocs} />}
			<PropsPanel
				label="Props"
				items={propData.items}
				uncollapsed={propData.uncollapsed}
				onChange={(value, path) =>
					emit("update-prop", { id: inspect!.id, path, value })
				}
				onCopy={() => inspect && emit("copy", serializeProps(inspect.props))}
				canAddNew
			/>
			{inspect && inspect.hooks !== null && (
				<PropsPanel
					label="Hooks"
					items={hooks.items}
					uncollapsed={hooks.uncollapsed}
					onChange={(value, path, node) => {
						emit("update-hook", {
							id: inspect!.id,
							value,
							meta: node != null ? node.meta : null,
						});
					}}
					onCopy={() => inspect && emit("copy", serializeProps(inspect.hooks))}
				/>
			)}
			{inspect && inspect.state !== null && (
				<PropsPanel
					label="State"
					items={state.items}
					uncollapsed={state.uncollapsed}
					onChange={(value, path) =>
						emit("update-state", { id: inspect!.id, path, value })
					}
					onCopy={() => inspect && emit("copy", serializeProps(inspect.state))}
				/>
			)}
			{inspect && inspect.context !== null && (
				<PropsPanel
					label="Context"
					items={context.items}
					uncollapsed={context.uncollapsed}
					onChange={(value, path) =>
						emit("update-context", { id: inspect!.id, path, value })
					}
					onCopy={() =>
						inspect && emit("copy", serializeProps(inspect.context))
					}
				/>
			)}
			{showDebug && <DebugNodeNavTree />}
			{showDebug && <DebugTreeStats />}
		</Fragment>
	);
}
