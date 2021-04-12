<script>
 import getDb from '../db.js';
 import {onMount} from 'svelte';

 let items = [];
 let store = null;
 let addCounter = () => null;
 let removeCounter = i => () => null;

 const handleChange = i => e => {
     e.preventDefault();
     items[i].update({
         $set: {
             [e.target.name]: (
                 e.target.type === 'number'
                 ? Number(e.target.value)
                 : e.target.value
             )
         }
     });
 }

 onMount(async () => {
     const { counters } = await getDb();

     store = counters.find().$;
     store.subscribe(newItems => items = newItems);

     addCounter = () => counters.insert({ order: `${Date.now()}`, name: '', count: 0 });
     removeCounter = i => () => items[i].remove();
 });
</script>

<div>
    <table>
        <thead>
            <tr>
                <th>Score</th>
                <th>Name</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {#each items as {name, count}, i}
                <tr>
                    <td><input name="count" type=number value={count} on:change={handleChange(i)} /></td>
                    <td><input name="name" type=text value={name} on:change={handleChange(i)} /></td>
                    <td><button on:click={removeCounter(i)}>🗑</button></td>
                </tr>
            {/each}
            <tr>
                <td colspan=3>
                    <button style=width:100% on:click={addCounter}>+</button>
                </td>
            </tr>
        </tbody>
    </table>
    <pre>{JSON.stringify(items, null, 2)}</pre>
</div>


<style>
 input {
     text-align: center;
 }
 input[type=number] {
     width: 3.2em;
 }
 table {
     float: left;
 }
 pre {
     float: right;
 }
</style>
