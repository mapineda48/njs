<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Vue } from "@/decorator";
import Popper from "../../Popper/index.vue";
import { Tag } from "@/store/state";

@Component({
  components: { Popper }
})
export default class Input extends Vue {
  private isLoading = false;
  private message = "";
  private timer:any = 0;

  private notify(message: string) {
    this.message = message;
    this.timer = setTimeout(() => {
      this.message = "";
      this.timer = 0;
    }, 2000);
  }

  private async removeIt(index: number) {
    if (this.message) {
      this.message = "";
      clearTimeout(this.timer);
      this.timer = 0;
    }

    try {
      this.isLoading = true;
      await this.remove(index);
    } catch (error) {
      this.notify(error.message || "unknown error");
    } finally {
      this.isLoading = false;
    }
  }

  @Prop() tag!: Tag;
  @Prop() index!: number;
  @Prop() remove!: (index: number) => Promise<void>;
  @Prop() edit!: (index: number) => void;
}
</script>

<template>
  <li class="tag">
    <div class="name">
      <div class="color" v-bind:style="{ backgroundColor: tag.color }"></div>
      <span>{{ tag.name }}</span>
    </div>
    <div class="line-left"></div>
    <div class="action">
      <span v-on:click="!isLoading ? removeIt(index) : undefined">Borrar</span>
      <Popper :placement="'left'" :tooltip="message" />
      <span v-on:click="!isLoading ? edit(index) : undefined">Editar</span>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@import "@/style/variables.scss";

$dot-color-size: 7px;

.tag {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1em 1.5em;

  &:hover {
    background-color: whitesmoke;

    .line-left {
      background-color: $color-primary;
    }
  }

  .line-left {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 3px;
    background-color: transparent;
  }

  //tag name
  .name {
    display: flex;
    justify-content: center;
    align-items: center;

    div:first-child {
      margin-right: 0.5em;
    }
  }

  .color {
    width: $dot-color-size;
    height: $dot-color-size;
    background-color: gray;
    border-radius: 50%;
  }

  //actions
  .action {
    user-select: none;

    span {
      cursor: pointer;
      border: none;
      background-color: transparent;

      font-size: 70%;
      color: gray;

      &:hover {
        //transform: scale(1.1);
        border-bottom: 2px solid $color-primary;
      }
    }

    > span {
      margin-right: 0.5em;
    }
  }
}
</style>
