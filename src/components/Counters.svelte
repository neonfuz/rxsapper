<script>
 let counters = [
     { name: 'Foo', value: 2 },
     { name: 'Bar', value: 5 },
     { name: 'Baz', value: 12 },
 ];
 const addCounter = () => counters = [...counters, { name: '', value: 0 }];
 const removeCounter = i => () => counters = [...counters.slice(0,i), ...counters.slice(i+1)];
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
        {#each counters as {name, value}, i}
            <tr>
                <td><input type=number bind:value /></td>
                <td><input type=text bind:value={name} /></td>
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



<style>
 input {
     text-align: center;
 }
 input[type=number] {
     width: 3.2em;
 }
</style>
