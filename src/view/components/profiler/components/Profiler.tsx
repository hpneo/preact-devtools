import { h, Fragment } from "preact";
import s from "../../Devtools.css";
import s2 from "./Profiler.css";
import { ThemeSwitcher } from "../../ThemeSwitcher";
import { TimelineBar } from "./TimelineBar/TimelineBar";
import { FlameGraph } from "../flamegraph/FlameGraph";
import { SidebarHeader } from "./SidebarHeader";
import { RenderedAt } from "./RenderedAt/RenderedAt";
import { ProfilerInfo } from "./ProfilerInfo/ProfilerInfo";
import { CommitInfo } from "./CommitInfo/CommitInfo";
import { RenderReasons } from "./RenderReasons";
import { DebugProfilerInfo } from "./CommitInfo/DebugInfo";
import { DebugNodeNav } from "./RenderedAt/DebugNodeNav";
import { useStore, useObserver } from "../../../store/react-bindings";

export function Profiler() {
	const store = useStore();
	const showDebug = useObserver(() => store.debugMode.$);

	return (
		<Fragment>
			<ThemeSwitcher />
			<div class={s.componentActions}>
				<TimelineBar />
			</div>
			<div class={`${s.components} ${s2.flamegraphWrapper}`}>
				<ProfilerInfo />
				<FlameGraph />
			</div>
			<div class={s.sidebarActions}>
				<SidebarHeader />
			</div>
			<div class={s.sidebar}>
				<RenderReasons />
				<RenderedAt />
				<CommitInfo />
				{showDebug && <DebugProfilerInfo />}
				{showDebug && <DebugNodeNav />}
			</div>
		</Fragment>
	);
}