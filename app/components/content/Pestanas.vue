<script setup lang="ts">
const slots = useSlots()
const activeIdx = ref(0)

const tabTitles = computed(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot) return []
  return defaultSlot
    .filter(vnode => vnode.props)
    .map((vnode, i) => (vnode.props as Record<string, unknown>)?.titulo as string || `Pestaña ${i + 1}`)
})
</script>

<template>
  <div class="pestanas">
    <div class="pestanas__nav" role="tablist">
      <button
        v-for="(titulo, i) in tabTitles"
        :key="i"
        role="tab"
        :aria-selected="i === activeIdx"
        class="pestanas__tab"
        :class="{ 'pestanas__tab--activa': i === activeIdx }"
        @click="activeIdx = i"
      >
        {{ titulo }}
      </button>
    </div>
    <div class="pestanas__panels">
      <template v-for="(vnode, i) in (slots.default?.() || []).filter(v => v.props)" :key="i">
        <div v-show="i === activeIdx" role="tabpanel" class="pestanas__panel">
          <component :is="vnode" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.pestanas {
  margin: 1.5rem 0;
  border: 1px solid var(--news-border);
  border-radius: 8px;
  overflow: hidden;
}

.pestanas__nav {
  display: flex;
  overflow-x: auto;
  background: var(--news-bg);
  border-bottom: 1px solid var(--news-border);
}

.pestanas__tab {
  padding: 0.7rem 1.25rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--news-muted);
  white-space: nowrap;
  position: relative;
  transition: color 0.15s;
}

.pestanas__tab:hover {
  color: var(--news-text);
}

.pestanas__tab--activa {
  color: var(--color-primary);
}

.pestanas__tab--activa::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-primary);
}

.pestanas__panel {
  padding: 1rem 1.25rem;
  font-size: 0.93rem;
  line-height: 1.6;
}
</style>
