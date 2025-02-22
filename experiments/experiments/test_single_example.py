from openpipe import OpenAI
import os

def test_single_example(api_key: str):
    client = OpenAI(
        openpipe={"api_key": api_key}
    )
    
    # Create the messages for this specific example
    messages = [
        {
            "role": "system",
            "content": "You are a helpful coding assistant that helps users edit their code."
        },
        {
            "role": "user",
            "content": """Given the following code edit history:
User edited file:

```diff
@@ -3,7 +3,7 @@
- import AnimatedSection from "@/components/animated-section";
- import AniSection from "@/components/ani-section";

export default function Home() {
  return (
    <>
      <Base>
        <main>
            <p>
              hey, i&apos;m <strong>rashad</strong> <WavingHand />
              <br />
              I love building products / features with <strong>llms</strong>.
              <br />
            </p>
          <AnimatedSection className="mt-12" delay={0.1}>
            <ExperienceSection />
          </AnimatedSection>
          <AnimatedSection className="mt-12" delay={0.2}>
            <ProjectsSection />
          </AnimatedSection>
          <AnimatedSection className="mt-12" delay={0.3}>
            <BlogSection />
          </AnimatedSection>
        </main>
      </Base>
    </>
  );
}
```

Please help me complete the code edit.

Here's the current code:
```typescript
import AniSection from "@/components/ani-section";

export default function Home() {
  return (
    <>
      <Base>
        <main>
            <p>
              hey, i&apos;m <strong>rashad</strong> <WavingHand />
              <br />
              I love building products / features with <strong>llms</strong>.
              <br />
            </p>
          <AnimatedSection className="mt-12" delay={0.1}>
            <ExperienceSection />
          </AnimatedSection>
          <AnimatedSection className="mt-12" delay={0.2}>
            <ProjectsSection />
          </AnimatedSection>
          <AnimatedSection className="mt-12" delay={0.3}>
            <BlogSection />
          </AnimatedSection>
        </main>
      </Base>
    </>
  );
}
```"""
        }
    ]
    
    try:
        completion = client.chat.completions.create(
            model="openpipe:rude-loops-jump",
            messages=messages,
            temperature=0,
            openpipe={
                "tags": {
                    "prompt_id": "enum_example",
                    "type": "single_test"
                }
            },
        )
        
        print("\nGenerated response:")
        print("=" * 50)
        print(completion.choices[0].message.content)
        
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    # Get API key from environment variable
    api_key = os.getenv("OPENPIPE_API_KEY")
    if not api_key:
        raise ValueError("Please set the OPENPIPE_API_KEY environment variable")
    
    test_single_example(api_key) 