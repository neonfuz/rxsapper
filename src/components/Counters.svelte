<script>
 import {withDb, handleChange, handleRemove} from '../db.js';

 let counters = [];
 let addCounter = () => null;

 withDb(async db => {
     db.counters.find().$.subscribe(next => counters = next);
     addCounter = () => db.counters.insert({ order: `${Date.now()}` });
 });
</script>

<table>
    <thead>
        <tr>
            <th>Score</th>
            <th>Name</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        {#each counters as counter, i}
            <tr>
                <td><input name="count" type=number value={counter.count} on:change={handleChange(counter)} /></td>
                <td><input name="name" type=text value={counter.name} on:change={handleChange(counter)} /></td>
                <td><button on:click={handleRemove(counter)}>🗑</button></td>
            </tr>
        {/each}
        <tr>
            <td colspan=3>
                <button style=width:100% on:click={addCounter}>+</button>
            </td>
        </tr>
    </tbody>
</table>
<pre>{JSON.stringify(counters, null, 2)}</pre>


<style>
 input {
     text-align: center;
 }
 input[type=number] {
     width: 3.2em;
 }
</style>
