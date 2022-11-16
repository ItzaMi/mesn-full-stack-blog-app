<script lang="ts">
	import { onMount } from 'svelte';

	let posts: any[] = [];

	onMount(async () => {
		await fetch(`http://localhost:4000/api/posts`)
			.then((r) => r.json())
			.then((data) => {
				posts = data;
			});
	});
</script>

{#if posts && posts.length > 0}
	{#each posts as post}
		<div>
			<h1>{post.title}</h1>
		</div>
	{/each}
{:else}
	<p>There are no posts</p>
{/if}
