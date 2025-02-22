from collections import defaultdict
import heapq

def dijkstra(graph, start):
    """
    Implements Dijkstra's shortest path algorithm.
    
    Args:
        graph: Dictionary of dictionaries representing weighted adjacency list
               {node: {neighbor: distance, ...}, ...}
        start: Starting node
        
    Returns:
        distances: Dictionary of shortest distances from start to all nodes
        paths: Dictionary of shortest paths from start to all nodes
    """
    # Initialize distances and paths
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    paths = {node: [] for node in graph}
    paths[start] = [start]
    
    # Priority queue to store (distance, node)
    pq = [(0, start)]
    
    while pq:
        current_distance, current_node = heapq.heappop(pq)
        
        # Skip if we've found a better path
        if current_distance > distances[current_node]:
            continue
            
        # Check all neighbors
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            
            # If we found a shorter path, update it
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                paths[neighbor] = paths[current_node] + [neighbor]
                heapq.heappush(pq, (distance, neighbor))
    
    return distances, paths

# Example usage:
if __name__ == "__main__":
    # Example graph
    graph = {
        'A': {'B': 4, 'C': 2},
        'B': {'A': 4, 'C': 1, 'D': 5},
        'C': {'A': 2, 'B': 1, 'D': 8, 'E': 10},
        'D': {'B': 5, 'C': 8, 'E': 2},
        'E': {'C': 10, 'D': 2}
    }
    
    start_node = 'A'
    distances, paths = dijkstra(graph, start_node)
    
    print(f"Shortest distances from {start_node}:")
    for node, distance in distances.items():
        print(f"To {node}: {distance}")
    
    print("\nShortest paths:")
    for node, path in paths.items():
        print(f"To {node}: {' -> '.join(path)}")


