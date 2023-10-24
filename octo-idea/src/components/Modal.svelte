<style>
    .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    max-width: 500px;
    border-radius: 8px;
}
</style>

<script>
    import postTag from './newPost.svelte';
    export let show = false;
    /**
	 * @type {any}
	 */
     export let close;
</script>

{#if show}
<div class="modal-background" on:click={close}>
    <div class="modal-content" on:click={e => e.stopPropagation()}>
        <slot></slot>
    </div>
</div>
{/if}


