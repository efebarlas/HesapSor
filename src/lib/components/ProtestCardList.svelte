<script>
    import ProtestCard from "./ProtestCard.svelte";

    let protests = [
        {
            title: "Climate Change March",
            date: "2023-04-22",
            location: "New York, NY",
            organizer: "Climate Action Network",
            description:
                "Join us in a peaceful march to raise awareness about climate change and demand action from our leaders.",
        },
        {
            title: "Equal Rights Rally",
            date: "2023-05-01",
            location: "Los Angeles, CA",
            organizer: "Equality Now",
            description:
                "Stand up for equal rights and show your support for marginalized communities at our annual rally.",
        },
        {
            title: "Animal Rights Demonstration",
            date: "2023-06-15",
            location: "Chicago, IL",
            organizer: "Animal Defense League",
            description:
                "Join us in raising awareness for animal rights and promoting cruelty-free practices across industries.",
        },
        {
            title: "Education Funding Protest",
            date: "2023-07-10",
            location: "Boston, MA",
            organizer: "Parents for Better Education",
            description:
                "Help us demand increased funding for public schools and better resources for teachers and students.",
        },
        {
            title: "Healthcare Reform March",
            date: "2023-08-20",
            location: "San Francisco, CA",
            organizer: "Healthcare for All",
            description:
                "Join our march to advocate for affordable and accessible healthcare for everyone.",
        },
        // More protests here...
    ];
</script>

<main>
    {#each protests as protest}
        <ProtestCard
            title={protest.title}
            date={protest.date}
            location={protest.location}
            organizer={protest.organizer}
            description={protest.description}
        />
    {/each}
</main>
