<script lang="ts">
    import { onMount } from 'svelte';
    import Post from './Post.svelte';
    import { getDocs, collection, query, where } from 'firebase/firestore';
    import { db } from '../firebaseConfig';
    import { writable } from 'svelte/store';
    import { selectedTag, searchTerm } from './selectedTagStore';
    
    interface PostType {
        authorId: string;
        title: string;
        content: string;
        author: string;
        date: string;
        upvotes: number;
        postId: string;
        tag: string;
    }
    
    const posts = writable<PostType[]>([]);
    const totalPosts = writable<number>(0);
    
    async function getTotalPostCount() {
        const allPostsSnapshot = await getDocs(collection(db, 'posts'));
        totalPosts.set(allPostsSnapshot.size);
    }
    
    async function loadPosts() {
        let baseQuery;
        if ($selectedTag !== 'all' && $searchTerm) {
            baseQuery = query(collection(db, "posts"), 
                where("tag", "==", $selectedTag),
                where("title", ">=", $searchTerm),
                where("title", "<=", $searchTerm + "\uf8ff")
            );
        } else if ($selectedTag !== 'all') {
            baseQuery = query(collection(db, "posts"), where("tag", "==", $selectedTag));
        } else if ($searchTerm) {
            baseQuery = query(collection(db, "posts"), 
                where("title", ">=", $searchTerm),
                where("title", "<=", $searchTerm + "\uf8ff")
            );
        } else {
            baseQuery = collection(db, "posts");
        }

        const querySnapshot = await getDocs(baseQuery);
        const newPosts = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            postId: doc.id
        })) as PostType[];

        posts.set(newPosts);
    }
    
    onMount(() => {
        getTotalPostCount();
        loadPosts();
    
        const unsubscribeTag = selectedTag.subscribe(() => {
            loadPosts();
        });
    
        const unsubscribeSearchTerm = searchTerm.subscribe(() => {
            loadPosts();
        });
    
        return () => {
            unsubscribeTag();
            unsubscribeSearchTerm();
        };
    });
</script>

<div class="feed">
    <h2>Global Feed</h2>
    {#each $posts as post}
        <Post 
            title={post.title}
            content={post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}
            author={post.author} 
            date={post.date} 
            initialUpvotes={post.upvotes} 
            postId={post.postId}
            authorId={post.authorId}
            tag={post.tag}
            on:delete={() => loadPosts()}
        />
    {/each}
</div>
<style>
    .feed {
    width: 50%;
    border: 1px solid #e0e0e0;
    padding: 20px;
    margin-top: 20px;
}
@media (max-width: 768px) {
        .feed {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
        }
    }
</style>
