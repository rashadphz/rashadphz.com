from datasets import load_dataset
import json

def examine_example(dataset_name: str, split: str = "train", index: int = 0):
    """
    Examine a single example from the dataset in detail
    """
    dataset = load_dataset(dataset_name)
    example = dataset[split][index]
    
    print("Full example content:")
    print("=" * 50)
    for key, value in example.items():
        print(f"\n{key}:")
        print("-" * 30)
        print(value)
        print("\n")

if __name__ == "__main__":
    dataset_name = "zed-industries/zeta"
    examine_example(dataset_name) 