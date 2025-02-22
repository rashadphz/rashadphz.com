from datasets import load_dataset
import json
from typing import List, Dict
import os

def create_conversation(events: str, input_code: str, output_code: str) -> Dict:
    """
    Create a conversation in Fireworks format from code editing data
    """
    # Create a clear instruction from the events
    instruction = f"Given the following code edit history:\n{events}\n\nPlease help me complete the code edit."
    
    return {
        "messages": [
            {"role": "system", "content": "You are a helpful coding assistant that helps users edit their code."},
            {"role": "user", "content": f"{instruction}\n\nHere's the current code:\n{input_code}"},
            {"role": "assistant", "content": f"Suggestion:\n{output_code}"}
        ]
    }

def convert_to_fireworks_format(dataset_name: str, output_file: str = "fireworks_dataset.jsonl"):
    """
    Convert a dataset to Fireworks format
    Args:
        dataset_name: Name of the dataset on Hugging Face
        output_file: Name of the output JSONL file
    """
    try:
        print(f"Loading dataset: {dataset_name}")
        dataset = load_dataset(dataset_name)
        
        # Process all splits
        for split_name in dataset.keys():
            split_data = dataset[split_name]
            split_output_file = f"{split_name}_{output_file}"
            
            print(f"\nConverting {len(split_data)} examples from {split_name} split...")
            
            # Open the output file in write mode
            with open(split_output_file, 'w', encoding='utf-8') as f:
                for example in split_data:
                    # Skip examples with missing data
                    if not all(k in example and example[k] for k in ['events', 'input', 'output']):
                        continue
                        
                    # Create the conversation
                    conversation = create_conversation(
                        events=example['events'],
                        input_code=example['input'],
                        output_code=example['output']
                    )
                    
                    # Write to JSONL file
                    f.write(json.dumps(conversation) + '\n')
            
            print(f"Conversion complete! Output saved to {split_output_file}")
            print(f"\nFirst few lines of the {split_name} output file:")
            print("=" * 50)
            os.system(f"head -n 3 {split_output_file}")
            print("\n")
        
    except Exception as e:
        print(f"Error converting dataset: {str(e)}")

if __name__ == "__main__":
    dataset_name = "zed-industries/zeta"
    convert_to_fireworks_format(dataset_name) 