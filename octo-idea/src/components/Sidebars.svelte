<!-- Sidebar.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { getDoc, doc } from "firebase/firestore";
    import HomeActionHandler from './HomeActionHandler.svelte';
    import NewPost from "./newPost.svelte";
    import Notifications from './Notifications.svelte';
    import Favorites from './Favorites.svelte';
  
    // Import db and auth from firebaseInit
    import { db, auth } from '../components/firebaseInit';
  
    let username = '';
    let menuOpen = false;
  
    onMount(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
              username = userDoc.data().username || '';
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      });
    });
</script>

<style>
    /* Styles for larger screens */
    .left-sidebar, .right-sidebar {
      width: 20%;
      padding: 20px;
      position: fixed;
      top: 20px;
      min-height: 100vh;
    }
    .left-sidebar {
      left: 0;
    }
    .right-sidebar {
      right: 0;
    }
    .bottom-section {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 20%;
      padding: 10px;
      box-sizing: border-box;
    }
    .menu-button {
      display: none;
    }
    /* Styles for smaller screens */
    @media (max-width: 768px) {
      .left-sidebar, .right-sidebar {
        display: none;
      }
      .menu-button {
        display: block;
        position: fixed;
        top: 20px;
        left: 20px;
      }
      .menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
</style>

<button class="menu-button" on:click={() => menuOpen = !menuOpen}>☰</button>

{#if menuOpen}
  <div class="menu">
    <button class="close-button" on:click={() => menuOpen = false}>✖</button>
    <a href={`/user/${username}`}>{username}</a>
    <Notifications />
    <HomeActionHandler />
    <h3>Preferiti</h3>
    <Favorites />
    <h3>New Post</h3>
    <NewPost />
  </div>
{/if}

<div class="left-sidebar">
  <a href={`/user/${username}`}>{username}</a>
  <Notifications />
  <div class="bottom-section">
    <HomeActionHandler />
  </div>
</div>

<div class="right-sidebar">
  <h3>Preferiti</h3>
  <Favorites />
  <h3>New Post</h3>
  <NewPost />
</div>
