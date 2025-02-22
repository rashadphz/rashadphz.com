import json
from openpipe import OpenAI
import os
from typing import List, Dict
import time

def load_test_data(file_path: str, num_examples: int = None) -> List[Dict]:
    """Load test examples from the JSONL file"""
    examples = []
    with open(file_path, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f):
            if num_examples and i >= num_examples:
                break
            examples.append(json.loads(line))
    return examples

def test_model(examples: List[Dict], api_key: str):
    """Test the model on the given examples"""
    client = OpenAI(
        openpipe={"api_key": api_key}
    )
    
    results = []
    for i, example in enumerate(examples):
        print(f"\nTesting example {i+1}/{len(examples)}")
        try:
            completion = client.chat.completions.create(
                model="openpipe:rude-loops-jump",
                messages=example["messages"][:-1],  # Exclude the assistant's message
                temperature=0,
                openpipe={
                    "tags": {
                        "prompt_id": f"test_example_{i}",
                        "split": "eval"
                    }
                },
            )
            
            # Store results
            results.append({
                "example_id": i,
                "input": example["messages"][-2]["content"],  # User message
                "expected": example["messages"][-1]["content"],  # Original assistant message
                "generated": completion.choices[0].message.content,
            })
            
            # Print comparison
            print("\nGenerated response:")
            print("-" * 50)
            print(completion.choices[0].message.content)
            print("\nExpected response:")
            print("-" * 50)
            print(example["messages"][-1]["content"])
            
            # Add a small delay to avoid rate limits
            time.sleep(1)
            
        except Exception as e:
            print(f"Error processing example {i}: {str(e)}")
    
    return results

def save_results(results: List[Dict], output_file: str = "openpipe_test_results.json"):
    """Save test results to a file"""
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)
    print(f"\nResults saved to {output_file}")

if __name__ == "__main__":
    # Get API key from environment variable
    api_key = os.getenv("OPENPIPE_API_KEY")
    if not api_key:
        raise ValueError("Please set the OPENPIPE_API_KEY environment variable")
    
    # Load test data (using eval split)
    test_examples = load_test_data("eval_fireworks_dataset.jsonl", num_examples=5)  # Testing with 5 examples
    
    # Run tests
    results = test_model(test_examples, api_key)
    
    # Save results
    save_results(results) 