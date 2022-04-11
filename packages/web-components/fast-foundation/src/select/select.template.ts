import { html, ref, slotted } from "@microsoft/fast-element";
import type { ViewTemplate } from "@microsoft/fast-element";
import { AnchoredRegion } from "../anchored-region/anchored-region.js";
import type { FoundationElementTemplate } from "../foundation-element/foundation-element.js";
import { Listbox } from "../listbox/listbox.js";
import { endSlotTemplate, startSlotTemplate } from "../patterns/start-end.js";
import type { Select, SelectOptions } from "./select.js";

/**
 * The template for the {@link @microsoft/fast-foundation#(Select:class)} component.
 * @public
 */
export const selectTemplate: FoundationElementTemplate<
    ViewTemplate<Select>,
    SelectOptions
> = (context, definition) => {
    const anchoredRegionTag: string = context.tagFor(AnchoredRegion);
    return html`
    <template
        class="${x => (x.open ? "open" : "")} ${x =>
        x.disabled ? "disabled" : ""} ${x => x.position}"
        aria-activedescendant="${x => x.ariaActiveDescendant}"
        aria-controls="${x => x.ariaControls}"
        aria-disabled="${x => x.ariaDisabled}"
        aria-expanded="${x => x.ariaExpanded}"
        aria-haspopup="listbox"
        ?open="${x => x.open}"
        role="combobox"
        tabindex="${x => (!x.disabled ? "0" : null)}"
        @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
        @focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
        @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
    >
        <div class="control" part="control" ?disabled="${x => x.disabled}">
            ${startSlotTemplate(context, definition)}
            <slot name="button-container">
                <div class="selected-value" part="selected-value">
                    <slot name="selected-value">${x => x.displayValue}</slot>
                </div>
                <div aria-hidden="true" class="indicator" part="indicator">
                    <slot name="indicator">
                        ${definition.indicator || ""}
                    </slot>
                </div>
            </slot>
            ${endSlotTemplate(context, definition)}
        </div>
        <${anchoredRegionTag}
            class="region"
            part="region"
            auto-update-mode="${x => x.menuConfig?.autoUpdateMode}"
            fixed-placement="${x => x.menuConfig?.fixedPlacement}"
            vertical-positioning-mode="${x => x.menuConfig?.verticalPositioningMode}"
            vertical-default-position="${x => x.menuConfig?.verticalDefaultPosition}"
            vertical-scaling="${x => x.menuConfig?.verticalScaling}"
            vertical-inset="${x => x.menuConfig?.verticalInset}"
            vertical-viewport-lock="${x => x.menuConfig?.verticalViewportLock}"
            horizontal-positioning-mode="${x => x.menuConfig?.horizontalPositioningMode}"
            horizontal-default-position="${x => x.menuConfig?.horizontalDefaultPosition}"
            horizontal-scaling="${x => x.menuConfig?.horizontalScaling}"
            horizontal-inset="${x => x.menuConfig?.horizontalInset}"
            horizontal-viewport-lock="${x => x.menuConfig?.horizontalViewportLock}"
            ${ref("region")}
        >
        <div
            class="listbox"
            id="${x => x.listboxId}"
            part="listbox"
            role="listbox"
            ?disabled="${x => x.disabled}"
            ?hidden="${x => !x.open}"
            ${ref("listbox")}
        >
            <slot
                ${slotted({
                    filter: Listbox.slottedOptionFilter,
                    flatten: true,
                    property: "slottedOptions",
                })}
            ></slot>
        </div>
        </${anchoredRegionTag}>
    </template>
`;
};
