<script lang="ts">
    import Comments from './Comments.svelte';
    import Upvote from './Upvote.svelte';
    import { auth, db } from '../firebaseConfig';  // Assicurati di importare queste variabili
    import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"; 
    import { createEventDispatcher } from 'svelte';
    import { deletePostAndRelatedData } from './firebaseHelper';
    const dispatch = createEventDispatcher();


    export let title = '';
    export let content = '';
    export let author = '';
    export let date = '';
    export let initialUpvotes = 0;
    export let postId: string;
    export let authorId = '';
    export let tag = '';

    // Funzione per eliminare il post
    async function deletePost() {
    try {
        // Prima elimina tutti i dati correlati al post (commenti, upvotes, ecc.)
        await deletePostAndRelatedData(postId);
        
        // Poi, elimina il post stesso
        const postRef = doc(db, 'posts', postId);
        await deleteDoc(postRef);

        console.log("Post and related data deleted successfully");
        dispatch('delete');  // Emetti un evento "delete"
    } catch (error) {
        console.error("Error deleting post and related data: ", error);
    }
}


    import { onMount } from 'svelte';

let isFavorited = false;

async function toggleFavorite() {
    if (!auth.currentUser) {
        console.log("Utente non loggato.");
        return;
    }
    
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    
    if (isFavorited) {
        // Rimuovi dai preferiti
        await updateDoc(userDocRef, {
            favoritePosts: arrayRemove(postId)
        });
    } else {
        // Aggiungi ai preferiti
        await updateDoc(userDocRef, {
            favoritePosts: arrayUnion(postId)
        });
    }
    isFavorited = !isFavorited;
}

onMount(async () => {

    // Controlla se il post è nei preferiti dell'utente
    if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        const userData = userDoc.data();
        if (userData && userData.favoritePosts && userData.favoritePosts.includes(postId)) {
            isFavorited = true;
        }
    }
});

</script>

<style>
    .post-container {
    position: relative; /* Aggiungi questa proprietà */
    border: 1px solid #e0e0e0;
    padding: 20px;
    margin-bottom: 20px;
}

.post-title {
    font-weight: bold;
    font-size: 1.5em;
    margin-top: 0;
}

.post-meta {
    font-size: 0.8em;
    color: gray;
}

.favorite-button {
    position: absolute; /* Permette di posizionare il bottone in modo assoluto rispetto al suo contenitore relativo */
    top: 10px; /* Puoi aggiustare questo valore per allinearlo verticalmente come preferisci */
    right: 20px; /* La distanza dal lato destro del contenitore. Puoi modificare questo valore per adattarlo al design */
    background: none;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;
}
.delete-button {
    position: absolute;
    bottom: 10px; 
    right: 20px;
    background: none;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;
}
.actions-container {
    display: flex;
    align-items: flex-start;
    gap: 10px;
}

.comments-container {
    position: relative;
}
@media (max-width: 768px) {
    .favorite-button span, .delete-button span {
            display: none;
        }
    .post-title {
        font-size: 1em;
    }
}
</style>
<div class="post-container">
    <h2 class="post-title"><a href={`/post/${postId}`} class="post-link">{title}</a></h2>
    <p>{content}</p>
    <div class="post-meta">
        <span>Written by {author} on {date}</span>
        <span class="post-tag">Tag: {tag}</span>
    </div>
    <button class="favorite-button" on:click={toggleFavorite}>
        {#if isFavorited}
            🌟  <span>Rimuovi dai Preferiti</span>
        {:else}
            ⭐  <span>Aggiungi ai Preferiti</span>
        {/if}
    </button>
    <div class="actions-container">
        <div class="comments-container">
            <Comments postId={postId} />
            <!-- Assumi che il menu a discesa dei commenti si trovi all'interno del componente Comments -->
            <!-- <div class="comments-dropdown">Contenuto del menu a discesa</div> -->
        </div>
        <Upvote initialUpvotes={initialUpvotes} postId={postId} />
    </div>
    {#if auth.currentUser && auth.currentUser.uid === authorId}
        <button class="delete-button"on:click={deletePost}>🗑 <span>Elimina</span></button>
    {/if}
</div>


