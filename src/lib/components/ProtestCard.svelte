<script lang="ts">
    export let title = 'hello';
    export let date = '';
    export let location = '';
    export let description = '';
    export let organizer = '';
</script>
  
  
  <div class="protest-card">
    <div class="summary">
      <div class="title">{title}</div>
      <div class="details">
        <span>Date: {date}</span>
        <span>Location: {location}</span>
        <span>Organizer: {organizer}</span>
      </div>
      <div class="description">{description}</div>
    </div>
  </div>