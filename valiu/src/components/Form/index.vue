<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { Vue } from "@/decorator";
import InputTag from "./Input/index.vue";
import TagComponent from "./Tag/index.vue";
import { Tag } from "@/store/state";

@Component({
  components: {
    InputTag,
    Tag: TagComponent
  }
})
export default class Input extends Vue {
  private current = -1;

  private async submit(value: string) {
    if (this.current < 0) {
      await this.insert(value);
      return;
    }

    await this.update(value, this.current);
    this.current = -1;
  }

  private edit(index: number) {
    this.current = index;
  }

  private cancel() {
    this.current = -1;
  }

  @Prop() tags!: Tag[];
  @Prop() insert!: (value: string) => Promise<void>;
  @Prop() update!: (value: string, index: number) => Promise<void>;
  @Prop() remove!: (index: number) => Promise<void>;
  @Watch("tags") keepTags() {
    this.cancel();
  }
}
</script>

<template>
  <div class="tags">
    <div>
      <h5>Etiqueta</h5>
    </div>
    <InputTag
      :value="current > -1 ? tags[current].name : undefined"
      :onCancel="current > -1 ? cancel : undefined"
      :onSave="submit"
    />
    <div class="list">
      <ul>
        <Tag
          v-for="(tag, index) in tags"
          :key="tag.id"
          :tag="tag"
          :index="index"
          :remove="remove"
          :edit="edit"
        />
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/variables.scss";

$dot-color-size: 7px;

.tags {
  width: 100%;

  border: 1px solid whitesmoke;

  > div:first-child {
    border-bottom: 1px solid whitesmoke;
    padding: 0 1.5em;
  }

  .list {
    overflow: auto;
    max-height: 300px;

    ul {
      display: flex;
      flex-direction: column-reverse;

      // remove list stlyes
      list-style: none;
      padding: 0;
      margin: 0;

      overflow: auto;
    }
  }
}
</style>
