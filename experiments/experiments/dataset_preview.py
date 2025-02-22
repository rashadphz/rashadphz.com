from datasets import load_dataset
import pandas as pd
import sys

def preview_dataset(dataset_name: str, num_samples: int = 5):
    """
    Load and preview a Hugging Face dataset
    Args:
        dataset_name: Name of the dataset on Hugging Face
        num_samples: Number of samples to preview (default: 5)
    """
    try:
        print(f"Loading dataset: {dataset_name}")
        dataset = load_dataset(dataset_name)
        
        # Print dataset information
        print("\nDataset Structure:")
        print("=" * 50)
        print(dataset)
        
        # Get the first split (usually 'train')
        first_split = list(dataset.keys())[0]
        split_data = dataset[first_split]
        
        print(f"\nFeatures in the dataset:")
        print("=" * 50)
        for feature, feature_type in split_data.features.items():
            print(f"{feature}: {feature_type}")
        
        print(f"\nFirst {num_samples} samples from the {first_split} split:")
        print("=" * 50)
        
        # Convert the first few examples to pandas DataFrame for better visualization
        samples = split_data.select(range(num_samples))
        df = pd.DataFrame(samples)
        print(df)
        
        return dataset
        
    except Exception as e:
        print(f"Error loading dataset: {str(e)}")
        return None

if __name__ == "__main__":
    # You might need to run `huggingface-cli login` first to access the dataset
    dataset_name = "zed-industries/zeta"
    dataset = preview_dataset(dataset_name) 