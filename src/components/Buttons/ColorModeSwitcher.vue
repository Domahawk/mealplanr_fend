<script setup lang="ts">
import useTheme from "@/composables/useTheme.ts";

const {theme, toggleTheme} = useTheme();

const isActive = (icon: string): string => {
  if (icon === theme.value) {
    return 'active'
  }

  return '';
};

</script>

<template>
  <section class="color-mode-switcher">
    <div class="light-mode" :class="isActive('light')" @click="toggleTheme('light')">
      <svg xmlns="http://www.w3.org/2000/svg"
           width="20" height="20"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round"
           class="feather feather-sun"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </div>

    <div class="dark-mode" :class="isActive('dark')" @click="toggleTheme('dark')">
      <svg xmlns="http://www.w3.org/2000/svg"
           width="20" height="20"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round"
           class="feather feather-moon"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </div>

    <div class="neon-mode" :class="isActive('neon')" @click="toggleTheme('neon')">
      <svg xmlns="http://www.w3.org/2000/svg"
           width="20" height="20"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round"
           class="feather feather-activity glow"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.color-mode-switcher {
  display: flex;
  align-items: center;
  width: 100px;
  height: 25px;
  margin-top: 5px;
}

.light-mode {
  border: 2px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  border-radius: 12px 0 0 12px;
  width: 33.3%;
}

.dark-mode {
  color: #1e1e1e;
  border: 2px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  border-left: none;
  width: 33.3%;
}

.neon-mode {
  border: 2px solid var(--border-color);
  border-left: none;
  border-radius: 0 12px 12px 0;
  width: 33.3%;
}

.neon-mode, .dark-mode, .light-mode {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}

.glow {
  color: #ce4aff;
  filter: drop-shadow(0 0 2px #ce4aff); /* Yellow glow */
}

.active {
  background: var(--active);
}

</style>