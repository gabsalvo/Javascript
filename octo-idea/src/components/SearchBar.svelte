<!-- SearchBar.svelte -->

<script>
    import { selectedTag, searchTerm } from './selectedTagStore';
    let localSelectedTag = $selectedTag;
    let localSelectedTerm = $searchTerm;

    function updateSelectedTag() {
        selectedTag.set(localSelectedTag);
    }

    function handleSearch() {
        searchTerm.set(localSelectedTerm); // Aggiorna lo store ogni volta che l'utente preme "Invio"
    }

</script>
<div class="search-bar">
    <div class="search-container">
        <input type="text" bind:value={localSelectedTerm} placeholder="Cerca..." on:keydown={(e) => e.key === 'Enter' && handleSearch()} />
        <button on:click={handleSearch}>Cerca</button>
    </div>
    <select bind:value={localSelectedTag} on:change={updateSelectedTag}>
        <option value="all">Tutti i tags</option>
        <option value="tag1">Tag 1</option>
        <option value="tag2">Tag 2</option>
        <!-- Aggiungi altre opzioni qui -->
    </select>
</div>
<style>
    .search-bar {
    margin: 20px 0;
}
.search-container {
    display: flex;
    align-items: center;
}

input[type="text"] {
    flex: 1;
    margin-right: 10px;
}

button {
    padding: 5px 10px;
}
</style>

