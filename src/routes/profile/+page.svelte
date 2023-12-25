<script lang="ts">
    import type { PageData } from './$types';
    import { InputChip, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
    export let data: PageData;
</script>

<div class="container h-full mx-auto gap-8 flex flex-col">
    <form class="card p-4 flex flex-col gap-3">
        <h2 style="font-weight: bold">Nutzer Informationen</h2>
        <p>Dein Informationen werden für die Erstellung der Bewerbungen genutzt.</p>
        <span>Name:</span>
        <input class="input" type="text" placeholder="Name.." value="Ahmad" />
        <span>geburtsdatum:</span>
        <input class="input" type="date" placeholder="geburtsdatum.." value="1991-01-01"/>
        <span>Beruf:</span>
        <input class="input" type="text" placeholder="Name.." value="Architekt"/>
        <span>Arbeitsgeber:</span>
        <input class="input" type="text" placeholder="Name.." value="BOSCH"/>
        <span>Beschäftigt seit:</span>
        <input class="input" type="date" placeholder="geburtsdatum.." value="2021-06-01"/>
        <span>Hobbies:</span>
        <input class="input" type="text" placeholder="Name.." value="Schwimmen, Lesen, Wandern"/>
        <span>weitere Info:</span>
        <textarea  class="textarea" rows="5" placeholder="Weitere Informationen..." />
        <!-- <InputChip   name="tags" placeholder="tags..." /> -->
        <button type="button" class="btn variabt-ghost-primary self-end">Info aktualisieren</button>
    </form>
</div>