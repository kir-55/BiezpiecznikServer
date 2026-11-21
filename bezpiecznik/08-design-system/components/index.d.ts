import type * as React from 'react';
type Node = React.ReactNode;
type Fn = () => void;

/* ---------- kontrolki ---------- */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = jasny (jedna główna akcja) · secondary (domyślny) · ghost · danger (akcje niszczące, obrys) · danger-solid · sos (tylko 112) */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid' | 'sos';
  /** sm 32 · md 36 · lg 44 · xl 56 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: Node; iconRight?: Node; loading?: boolean; fullWidth?: boolean;
  /** Drugi wiersz pod etykietą (np. „Numer alarmowy”). */
  sub?: Node;
  children?: Node;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export declare function Checkbox(p: { checked?: boolean; defaultChecked?: boolean; onChange?: (v: boolean) => void; disabled?: boolean; 'aria-label': string; className?: string }): React.ReactElement;
export declare function Switch(p: { checked?: boolean; defaultChecked?: boolean; onChange?: (v: boolean) => void; disabled?: boolean; 'aria-label': string; className?: string }): React.ReactElement;
export interface Option { id: string; label: Node }
/** allowEmpty: trójstanowe Tak / Nie (null = brak danych). */
export declare function Segmented(p: { options: Option[]; value?: string | null; defaultValue?: string | null; onChange?: (v: string | null) => void; allowEmpty?: boolean; size?: 'sm' | 'md' | 'lg'; fullWidth?: boolean; 'aria-label'?: string; className?: string }): React.ReactElement;
export declare function ProgressBar(p: { value: number; 'aria-label'?: string; className?: string }): React.ReactElement;
export declare function ChoiceChips(p: { options: Option[]; multiple?: boolean; value?: string | string[] | null; defaultValue?: string | string[] | null; onChange?: (v: any) => void; 'aria-label'?: string; className?: string }): React.ReactElement;
export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> { label?: Node; hint?: Node; error?: Node; suffix?: Node }
export declare function TextField(p: TextFieldProps): React.ReactElement;
export declare function ListRow(p: { label: Node; sub?: Node; value?: Node; icon?: Node; trailing?: Node; chevron?: boolean; tone?: 'danger'; onClick?: Fn; className?: string }): React.ReactElement;
export declare function SectionHeader(p: { children: Node; className?: string }): React.ReactElement;
export declare function Notice(p: { variant?: 'bar' | 'banner' | 'warning' | 'error'; title?: Node; icon?: string | false; action?: Node; onClick?: Fn; children?: Node; className?: string }): React.ReactElement;
export declare function Toast(p: { children: Node; actionLabel?: string; onAction?: Fn; className?: string }): React.ReactElement;
export declare function Dialog(p: { title: string; children?: Node; confirmLabel?: string; cancelLabel?: string; danger?: boolean; onConfirm?: Fn; onCancel?: Fn; className?: string }): React.ReactElement;
export declare function Sheet(p: { title?: string; onClose?: Fn; floating?: boolean; maxHeight?: string; children?: Node; className?: string }): React.ReactElement;

/* ---------- elementy globalne ---------- */
export declare function NavIsland(p: { onMenu?: Fn; onMap?: Fn; className?: string }): React.ReactElement;
export declare function FloatingButton(p: { kind?: 'back' | 'close' | 'locate'; icon?: string; active?: boolean; disabled?: boolean; onClick?: Fn; 'aria-label'?: string; className?: string }): React.ReactElement;
/** Dotknięcie → onPress (Panel 2). Przytrzymanie holdMs (800) → onHold (tel:112). */
export declare function SosButton(p: { onPress?: Fn; onHold?: Fn; holdMs?: number; className?: string }): React.ReactElement;
export declare function CprIndicator(p: { time: string; rate?: number; onClick?: Fn; className?: string }): React.ReactElement;

/* ---------- czat ---------- */
export interface ComposerProps {
  value?: string; defaultValue?: string; onChange?: (v: string) => void; onSubmit?: (v: string) => void;
  placeholder?: string; disabled?: boolean; maxLength?: number; maxRows?: number;
  /** Enter wysyła (desktop). Domyślnie false: Enter = nowa linia (spec E1). */
  enterToSend?: boolean;
  /** Model generuje: przycisk zmienia się w Zatrzymaj (■) i woła onStop. */
  generating?: boolean; onStop?: Fn;
  onAttach?: Fn; onVoice?: Fn; className?: string;
}
export declare function Composer(p: ComposerProps): React.ReactElement;
export type Origin = 'rescue_card' | 'rules' | 'ai' | 'no_ai' | 'refusal';
export declare function Message(p: { role?: 'user' | 'assistant'; origin?: Origin; status?: 'generating' | 'done' | 'stopped' | 'error'; children?: Node; sources?: Node; actions?: Node; animate?: boolean; className?: string }): React.ReactElement;
export declare function AnswerLabel(p: { origin: Origin }): React.ReactElement | null;
/** Spec: docShort + page → „▸ {doc_short}, s. {page_label}”. Starszy format: source/title/page. */
export declare function SourceChip(p: { docShort?: string; docTitle?: string; page?: number | string | null; source?: string; title?: string; href?: string; onClick?: Fn; tone?: 'neutral'; icon?: string; className?: string }): React.ReactElement;
export declare function Thinking(p: { label?: string | null; skeleton?: boolean; className?: string }): React.ReactElement;
export declare function QuickActions(p: { items?: { id: string; label: string; icon: string; urgent?: boolean }[]; onSelect?: (it: any) => void; className?: string }): React.ReactElement;
export declare function JumpToLatest(p: { onClick?: Fn; children?: Node; className?: string }): React.ReactElement;
export declare function NoSource(p: { title?: string; children?: Node; suggestion?: Node; actions?: Node; className?: string }): React.ReactElement;
export declare function OfflineBadge(p: { mode?: 'offline' | 'airplane'; children?: Node; className?: string }): React.ReactElement;

/* ---------- szablony odpowiedzi ---------- */
export declare function PanelCard(p: { title?: Node; icon?: string; aside?: Node; tone?: 'sos' | 'done'; footer?: Node; children?: Node; className?: string }): React.ReactElement;
export interface SourceRef { docShort: string; docTitle?: string; page: number | string; onClick?: Fn }
export interface StepItem { text: Node; source?: SourceRef; detail?: Node; onSource?: Fn }
export declare function StepsPanel(p: { title?: string; items: StepItem[]; variants?: Option[]; variant?: string; onVariantChange?: (id: string) => void; done?: number[]; defaultDone?: number[]; onDoneChange?: (done: number[]) => void; readAloud?: boolean; reading?: boolean; onReadAloud?: Fn; onSource?: (s: SourceRef) => void }): React.ReactElement;
/** @deprecated Lista bez karty i odhaczania. W szablonie steps użyj StepsPanel. */
export declare function Steps(p: { items: { title: Node; detail?: Node }[]; className?: string }): React.ReactElement;
export declare function BulletsPanel(p: { title: string; items: { text: Node; source?: SourceRef }[]; checkable?: boolean; done?: number[]; defaultDone?: number[]; onDoneChange?: (done: number[]) => void }): React.ReactElement;
export declare function QuotePanel(p: { docTitle: string; pageLabel: string | number; publisher?: string; issued?: string; title?: string; before?: string; highlight: string; after?: string; imageSrc?: string; rects?: number[][]; full?: boolean; missing?: boolean; onExpand?: Fn }): React.ReactElement;
export type PointKind = 'shelter' | 'hiding_place' | 'emergency_shelter' | 'hospital' | 'fire_station' | 'water' | 'pharmacy';
export declare function MapCard(p: { title?: string; kind?: PointKind; name?: string; distance?: number; time?: number; bearing?: number; confirmed?: boolean; straightLine?: boolean; lastKnown?: string; noPosition?: boolean; staleMonths?: number; source?: string; onGuide?: Fn; onOpenMap?: Fn }): React.ReactElement;
export declare function MiniMap(p: { glyph?: string; confirmed?: boolean }): React.ReactElement;
export declare function CallPanel(p: { variant?: 'inline' | 'sheet'; contacts?: string[]; smsAvailable?: boolean; onCall?: (num: string) => void; onSms?: () => void; onEditContacts?: () => void }): React.ReactElement;
/** @deprecated Zastąpiony przez CallPanel (szablon call). */
export declare function Fallback112(p: { title?: string; children?: Node; hint?: Node; number?: string; className?: string }): React.ReactElement;
export declare function SignalPanel(p: { modes?: ('sound' | 'flashlight' | 'screen')[]; on?: { sound?: boolean; flashlight?: boolean; screen?: boolean }; onToggle?: (mode: string, v: boolean) => void; interval?: string; onInterval?: (v: string | null) => void; runningFor?: string; battery?: number; batteryDrop?: number; flashlightAvailable?: boolean; volumeLow?: boolean; bare?: boolean }): React.ReactElement;
export declare function CprCard(p: { state?: 'idle' | 'running' | 'done'; variantLabel?: string; rate?: number; ratio?: string; source?: SourceRef; summaryTime?: string; summaryCycles?: number; onStart?: Fn; onRestart?: Fn }): React.ReactElement;
export declare function CprPinned(p: { variantLabel?: string; rate?: number; phase?: 'compress' | 'breaths'; count?: number; total?: number; breathLeft?: number; elapsed: string; changeIn?: string; changeAlert?: boolean; aedReminder?: boolean; paused?: boolean; compact?: boolean; onPause?: Fn; onEnd?: Fn; onNext?: Fn; onAedDone?: Fn; onAedHelp?: Fn }): React.ReactElement;
export declare function AnimationPanel(p: { caption: string; src?: string; poster?: string; autoplay?: boolean; placeholder?: Node; source?: SourceRef }): React.ReactElement;

/* ---------- mapa ---------- */
export declare function MapMarker(p: { kind?: PointKind; confirmed?: boolean; selected?: boolean; count?: number; size?: 'sm'; className?: string }): React.ReactElement;
export declare function UserDot(p: { heading?: number; accuracy?: number; stale?: boolean; age?: string; className?: string }): React.ReactElement;
export declare function DetailIndicator(p: { inside: boolean; onDownload?: Fn; className?: string }): React.ReactElement;
export declare function PointSheet(p: { kind: PointKind; name?: string; address?: string; availability?: string; distance?: number; bearing?: number; relBearing?: number; confirmed?: boolean; sourceName: string; verifiedAt: string; stale?: boolean; onGuide?: Fn; onCompass?: Fn }): React.ReactElement;
export declare function NearestList(p: { items: { kind: PointKind; name: string; distance: number; relBearing: number; confirmed?: boolean }[]; onSelect?: (it: any) => void }): React.ReactElement;
export declare function LayersSheet(p: { layers: { id: string; kind: PointKind; label: string; on?: boolean; defaultOn?: boolean }[]; onToggle?: (id: string, v: boolean) => void }): React.ReactElement;
export declare function RouteBanner(p: { turn: 'left' | 'right' | 'slight-left' | 'slight-right' | 'straight'; distance: number; street?: string; className?: string }): React.ReactElement;
export declare function RouteBar(p: { distance: number; time: number; onSteps?: Fn; onCompass?: Fn; onEnd?: Fn; className?: string }): React.ReactElement;
export declare function CompassView(p: { target: string; distance?: number; bearing?: number; cardinal?: string; rotation?: number; coords?: string; note?: Node; onShowMap?: Fn; onEnd?: Fn; className?: string }): React.ReactElement;

/* ---------- panel boczny, onboarding, profil ---------- */
export declare function ChatDrawer(p: { groups: { label: string; items: { id: any; title: string; time: string }[] }[]; currentId?: any; onNewChat?: Fn; onSelect?: (c: any) => void; onSettings?: Fn; className?: string }): React.ReactElement;
export declare function StepHeader(p: { title: Node; step?: number; total?: number; className?: string }): React.ReactElement;
export declare function QuestionStep(p: { question: Node; hint?: Node; onYes?: Fn; onNo?: Fn; onSkip?: Fn; className?: string }): React.ReactElement;
export declare function PackageRow(p: { name: string; size?: string; hint?: Node; state?: 'waiting' | 'waitingWifi' | 'downloading' | 'done' | 'error' | 'paused' | 'unsupported'; progress?: number; selectable?: boolean; checked?: boolean; defaultChecked?: boolean; onCheck?: (v: boolean) => void; onRetry?: Fn; onPause?: Fn; className?: string }): React.ReactElement;

/** Znak B+ (litera ink-100, krzyż signal). wordmark: znak + „Bezpiecznik”. */
export declare function Logo(p: { size?: number; wordmark?: boolean; className?: string }): React.ReactElement;
export declare function Icon(p: { name: string; size?: number; stroke?: number; className?: string }): React.ReactElement;
export declare const format: { distance(m: number): string; cardinal(deg: number): string; dms(v: number, pos: string, neg: string): string };

declare global { interface Window { Bezpiecznik: Record<string, any> } }
