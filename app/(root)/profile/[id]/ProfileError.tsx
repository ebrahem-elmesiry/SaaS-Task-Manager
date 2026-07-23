import ErrorState from "@/features/shared/components/ErrorState/ErrorState";

type Props = {
  description: string;
  refetch: () => void;
};

export default function ProfileError({ description, refetch }: Props) {
  return <ErrorState description={description} onRetry={refetch} />;
}
