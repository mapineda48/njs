<!-- https://www.npmjs.com/package/@popperjs/core -->
<!-- https://popper.js.org/docs/v2/tutorial/ -->

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Vue } from "@/decorator";
import { createPopper, Instance, Options } from "@popperjs/core";

@Component
export default class Popper extends Vue {
  private instance: Instance | null = null;
  private popper: HTMLElement | null = null;
  private target: Element | null = null;

  private refreshRef() {
    const popper: HTMLDivElement = this.$refs["popper"] as any;

    if (!popper) {
      return;
    }

    /**
     * https://developer.mozilla.org/es/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling
     */
    const target = popper.previousElementSibling;

    if (!target) {
      return;
    }

    if (!this.target) {
      this.popper = popper;
      this.target = target;
      return;
    }

    if (this.popper !== popper) this.popper = popper;
    if (this.target !== target) this.target = target;
  }

  private createPopper() {
    if (!this.target || !this.popper) {
      return;
    }

    this.instance = createPopper(this.target, this.popper, {
      placement: this.placement || "bottom",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8]
          }
        }
      ]
    });
  }

  private destroyPopper() {
    if (!this.instance) return;

    this.instance.destroy();
    this.instance = null;
    this.popper = null;
    this.target = null;
  }

  private mounted() {
    this.refreshRef();
    if (this.tooltip) this.createPopper();
  }

  private updated() {
    this.refreshRef();
    if (!this.tooltip && this.instance) {
      this.destroyPopper();
    } else if (this.tooltip && !this.instance) {
      this.createPopper();
    }
  }

  private unmounted() {
    this.destroyPopper();
  }

  @Prop() public tooltip!: string;
  @Prop() public placement!: Options["placement"];
}
</script>

<template>
  <div v-if="tooltip" id="tooltip" role="tooltip" ref="popper">
    {{ tooltip }}
    <div id="arrow" data-popper-arrow></div>
  </div>
</template>

<style lang="scss" scoped>
#tooltip {
  background: #333;
  color: white;
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;

  z-index: 100;
}

#tooltip[data-show] {
  display: block;
}

#arrow,
#arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  z-index: -1;
}

#arrow::before {
  content: "";
  transform: rotate(45deg);
  background: #333;
}

#tooltip[data-popper-placement^="top"] > #arrow {
  bottom: -4px;
}

#tooltip[data-popper-placement^="bottom"] > #arrow {
  top: -4px;
}

#tooltip[data-popper-placement^="left"] > #arrow {
  right: -4px;
}

#tooltip[data-popper-placement^="right"] > #arrow {
  left: -4px;
}
</style>
